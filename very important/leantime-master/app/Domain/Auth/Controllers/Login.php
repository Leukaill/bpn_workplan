<?php

namespace Leantime\Domain\Auth\Controllers;

use Illuminate\Contracts\Container\BindingResolutionException;
use Leantime\Core\Configuration\Environment;
use Leantime\Core\Controller\Controller;
use Leantime\Core\Controller\Frontcontroller as FrontcontrollerCore;
use Leantime\Domain\Auth\Services\Auth as AuthService;
use Leantime\Domain\Setting\Services\Setting;
use Symfony\Component\HttpFoundation\Response;

class Login extends Controller
{
    private AuthService $authService;

    private Environment $config;

    private Setting $settingService;

    /**
     * init - initialize private variables
     */
    public function init(
        AuthService $authService,
        Environment $config,
        Setting $settingService
    ): void {
        $this->authService = $authService;
        $this->config = $config;
        $this->settingService = $settingService;
    }

    /**
     * get - handle get requests
     *
     *
     *
     *
     * @throws BindingResolutionException
     */
    public function get(array $params): Response
    {
        self::dispatchEvent('beforeAuth', $params);

        $return = self::dispatchFilter('beforeAuthHandling', $params);
        if ($return instanceof Response) {
            return $return;
        }

        $redirectUrl = BASE_URL.'/dashboard/home';

        if (isset($_GET['redirect']) && trim($_GET['redirect']) !== '' && trim($_GET['redirect']) !== '/') {
            $url = urldecode($_GET['redirect']);

            // Check for open redirects, don't allow redirects to external sites.
            if (
                filter_var($url, FILTER_VALIDATE_URL) === false &&
                ! in_array($url, ['/auth/logout'])
            ) {
                $redirectUrl = BASE_URL.'/'.$url;
            }
        }

        if ($this->config->useLdap) {
            $this->tpl->assign('inputPlaceholder', 'input.placeholders.enter_email_or_username');
        } else {
            $this->tpl->assign('inputPlaceholder', 'input.placeholders.enter_email');
        }
        $this->tpl->assign('redirectUrl', urlencode($redirectUrl));

        $this->tpl->assign('oidcEnabled', $this->config->oidcEnable);

        $hideLogin = $this->settingService->getSetting('auth.hideDefaultLogin');

        if (! empty($hideLogin) && $hideLogin == 'on') {
            $this->tpl->assign('noLoginForm', true);
        } else {
            $this->tpl->assign('noLoginForm', $this->config->disableLoginForm);
        }

        return $this->tpl->display('auth.login', 'entry');
    }

    /**
     * post - handle post requests
     *
     *
     *
     *
     * @throws BindingResolutionException
     */
    public function post(array $params): Response
    {
        if (isset($_POST['username']) === true && isset($_POST['password']) === true) {
            if (isset($_POST['redirectUrl'])) {
                $redirectUrl = urldecode(filter_var($_POST['redirectUrl'], FILTER_SANITIZE_URL));
            } else {
                $redirectUrl = '';
            }

            $username = filter_var($_POST['username'], FILTER_SANITIZE_EMAIL);
            $password = $_POST['password'];

            try {
                // Allow login interruptions through events
                self::dispatch_event('beforeAuthServiceCall', ['post' => $_POST]);

            } catch (\Exception $e) {

                $this->tpl->setNotification($e->getMessage(), 'error');

                return FrontcontrollerCore::redirect(BASE_URL.'/auth/login');
            }

            // If login successful redirect to the correct url to avoid post on reload
            if ($this->authService->login($username, $password) === true) {

                self::dispatch_event('successfulLogin', ['post' => $_POST]);

                if ($this->authService->use2FA()) {
                    return FrontcontrollerCore::redirect(BASE_URL.'/auth/twoFA');
                }

                return FrontcontrollerCore::redirect($redirectUrl);
            } else {
                $this->tpl->setNotification('notifications.username_or_password_incorrect', 'error');

                return FrontcontrollerCore::redirect(BASE_URL.'/auth/login');
            }
        } else {
            $this->tpl->setNotification('notifications.username_or_password_missing', 'error');

            return FrontcontrollerCore::redirect(BASE_URL.'/auth/login');
        }
    }
}
