<?php

namespace Leantime\Core\Middleware;

use Closure;
use Illuminate\Auth\AuthManager;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;
use Leantime\Core\Configuration\Environment;
use Leantime\Core\Events\DispatchesEvents;
use Leantime\Core\Http\ApiRequest;
use Leantime\Core\Http\IncomingRequest;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthCheck
{
    use DispatchesEvents;

    /**
     * Public actions
     */
    private array $publicActions = [
        'auth.login',
        'auth.resetPw',
        'auth.userInvite',
        'auth.getToken',
        'install',
        'install.index',
        'install.update',
        'errors.error404',
        'errors.error500',
        'api.i18n',
        'api.static-asset',
        'calendar.ical',
        'oidc.login',
        'oidc.callback',
        'cron.run',
        'auth.callback',
        'auth.redirect',
    ];

    public function __construct(
        protected Environment $config,
        protected Auth $auth,
        protected AuthManager $authManager,
    ) {
        $this->publicActions = self::dispatchFilter('publicActions', $this->publicActions, ['bootloader' => $this]);
    }

    /**
     * Handle the request
     */
    public function handle(IncomingRequest $request, Closure $next): Response
    {

        if ($this->isPublicController($request->getCurrentRoute())) {
            return $next($request);
        }

        $loginRedirect = self::dispatch_filter('loginRoute', 'auth.login', ['request' => $request]);

        if ($request instanceof ApiRequest) {
            self::dispatchEvent('before_api_request', ['application' => app()], 'leantime.core.middleware.apiAuth.handle');
        }

        $authCheckResponse = $this->authenticate($request, array_keys($this->config->get('auth.guards')), $loginRedirect, $next);

        // If auth fails either return json response or do the redirect
        if ($authCheckResponse !== true) {
            return $authCheckResponse;
        }

        self::dispatchEvent('logged_in', ['application' => $this]);

        $response = $next($request);

        if ($authCheckResponse === true) {
            $this->setCookie($response);
        }

        return $response;
    }

    protected function authenticate($request, array $guards, $loginRedirect, $next)
    {
        if ($request->isApiOrCronRequest()) {
            return $this->authenticateApi($request, $guards);
        }

        return $this->authenticateWeb($request, $guards, $loginRedirect, $next);
    }

    protected function authenticateWeb($request, array $guards, $loginRedirect, $next)
    {

        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                $this->auth->shouldUse($guard);

                // Check if trying to access twoFA code page, or if trying to access any other action without verifying the code.
                if (session('userdata.twoFAEnabled')
                    && ! session('userdata.twoFAVerified')) {
                    return $this->redirectWithOrigin('twoFA.verify', $_GET['redirect'] ?? '', $request) ?: $next($request);
                }

                return true;
            }
        }

        if ($request instanceof APIRequest) {
            return new Response(json_encode(['error' => 'Invalid API Key']), 401);
        }

        return $this->redirectWithOrigin($loginRedirect, $request->getRequestUri(), $request) ?: $next($request);

    }

    protected function authenticateApi($request, array $guards)
    {
        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                $this->auth->shouldUse($guard);

                return true;
            }
        }

        return new Response(json_encode(['error' => 'Unauthorized']), 401);
    }

    /**
     * Redirect with origin
     * Returns false if the current route is already the redirection route.
     *
     * @return Response|RedirectResponse
     *
     * @throws BindingResolutionException
     */
    public function redirectWithOrigin(string $route, string $origin, IncomingRequest $request): false|RedirectResponse
    {

        $uri = ltrim(str_replace('.', '/', $route), '/');
        $destination = BASE_URL.'/'.$uri;
        $originClean = Str::replaceStart('/', '', $origin);
        $queryParams = ! empty($origin) && $origin !== '/' ? '?'.http_build_query(['redirect' => $originClean]) : '';

        if ($request->getCurrentRoute() == $route) {
            return false;
        }

        return new RedirectResponse($destination.$queryParams);
    }

    public function setCookie($response)
    {

        // Set cookie to increase session timeout
        $response->headers->setCookie(new \Symfony\Component\HttpFoundation\Cookie(
            'esl', // Extend Session Lifetime
            'true',
            Date::instance(
                Carbon::now()->addRealMinutes($this->config->get('session.lifetime'))
            ),
            $this->config->get('session.path'),
            $this->config->get('session.domain'),
            false,
            $this->config->get('session.http_only', true),
            false,
            $this->config->get('session.same_site', null),
            $this->config->get('session.partitioned', false)
        ));
    }

    public function isPublicController($currentPath)
    {

        // path comes in with dots as separator.
        // We only need to compare the first 2 segments
        $currentPath = explode('.', $currentPath);

        // Todo: We may want to take out hx if we have public htmx paths
        if (! is_array($currentPath)) {
            return false;
        }

        if (count($currentPath) == 1) {
            if (in_array($currentPath[0], $this->publicActions)) {
                return true;
            }

            return false;
        }

        $controllerPath = $currentPath[0].'.'.$currentPath[1];
        if (in_array($controllerPath, $this->publicActions)) {
            return true;
        }

        return false;

    }
}
