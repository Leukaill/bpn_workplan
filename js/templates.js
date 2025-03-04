/**
 * Generates the header content for the page, including logo, navigation links, and profile button.
 * This function returns an HTML string that contains the layout for the page header,
 * including the logo, project name, help icon, profile button, and a mobile menu with 
 * links for help, privacy policy, legal notice, and log out.
 * 
 * @returns {string} The HTML string representing the header content.
 */
function getHeaderContent() {
    return `
        <a href="../pages/summary.html" class="logo-container">
            // <img class="logo-header" src="../assets/icons/Logo_quadrat.svg" alt="BPN Logo"/>
        </a>
        <span class="project-name">BPN Rwanda Project management</span>
        <div id="header-menu" class="header-menu">
            <a href="../pages/help.html" class="help-icon" aria-label="Read more about Join">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                    <path
                        d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z">
                    </path>
                </svg>
            </a>
            <button id="menu-toggle-button" class="profile-button" aria-label="help-btn" onclick="toggleMobileMenu()">
                <span id="current-user-initials" class="profile-initials">SM</span>
            </button>
            <div id="mobile-menu" class="mobile-menu hidden">
                <a href="../pages/help.html" class="mobile-nav-help nav-link">Help</a>
                <a href="../pages/privacy-policy.html" class="nav-link">Privacy Policy</a>
                <a href="../pages/legal-notice.html" class="nav-link">Legal Notice</a>
                <a href="#" onclick="logOut()">Log out</a>
            </div>
        </div>
    `;
}


/**
 * Generates the navigation content for the page, including the main menu and footer links.
 * This function returns an HTML string containing the structure for the navigation bar,
 * including the logo, main menu items (Summary, Add Task, Board, and Contacts), and footer links
 * (Privacy Policy and Legal Notice). Each menu item includes an SVG icon and a corresponding link.
 * 
 * @returns {string} The HTML string representing the navigation content with the menu and footer links.
 */
function getNavigationContent() {
    return `
        <nav role="navigation">
            <a href="../pages/summary.html" class="nav-logo">
                <img s"/>
            </a>
            <div id="main-menu" class="menu">
                <a href="../pages/summary.html" class="nav-link">
                    <div class="menu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z">
                            </path>
                        </svg>
                        Summary
                    </div>
                </a>
                <a href="../pages/add-task.html" class="nav-link">
                    <div class="menu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>
                        Add Task
                    </div>
                </a>
                <a href="../pages/board.html" class="nav-link">
                    <div class="menu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M216,48H40a8,8,0,0,0-8,8V208a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V160h48v16a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V56A8,8,0,0,0,216,48ZM88,208H48V128H88Zm0-96H48V64H88Zm64,32H104V64h48Zm56,32H168V128h40Zm0-64H168V64h40Z">
                            </path>
                        </svg>
                        Board
                    </div>
                </a>
                <a href="../pages/contacts.html" class="nav-link">
                    <div class="menu-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z">
                            </path>
                        </svg>
                        Contacts
                    </div>
                </a>
            </div>
            <div class="footer-links">
                <a href="../pages/privacy-policy.html" class="footer-link">Privacy Policy</a>
                <a href="../pages/legal-notice.html" class="footer-link">Legal Notice</a>
            </div>
        </nav>
    `;
}


/**
 * Generates the HTML content for the summary page, including statistics and task information.
 * The function returns an HTML string that contains various sections displaying tasks, including:
 * - To-Do and Done task counts with links to the board page.
 * - Urgent tasks count and due date information.
 * - Total tasks, tasks in progress, and tasks awaiting feedback.
 * Additionally, a greeting message with the current time of day and the user's name (default is "Guest").
 * 
 * @returns {string} The HTML string representing the summary content, including the statistics sections and greeting message.
 */
function getSummaryContent() {
    return `
        <section class="summary-stats-container">
            <div class="first-stats-section">
                <a href="../pages/board.html" id="summary-todo" class="summary-card">
                    <div class="summary-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z">
                            </path>
                        </svg>
                    </div>
                    <div class="task-count">
                        <span id="amount-todo" class="summary-card-number"></span>
                        <span class="summary-card-label">To-Do</span>
                    </div>
                </a>
                <a href="../pages/board.html" id="summary-done" class="summary-card">
                    <div class="summary-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
                        </svg>
                    </div>
                    <div class="task-count">
                        <span id="amount-done" class="summary-card-number"></span>
                        <span class="summary-card-label">Done</span>
                    </div>
                </a>
            </div>
            <a href="../pages/board.html" class="second-stats-section">
                <div id="summary-priority" class="summary-card-secondary">
                    <div id="summary-urgent" class="summary-card-urgent">
                        <div class="summary-icon-urgent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                                <path
                                    d="M216.49,191.51a12,12,0,0,1-17,17L128,137,56.49,208.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0Zm-160-63L128,57l71.51,71.52a12,12,0,0,0,17-17l-80-80a12,12,0,0,0-17,0l-80,80a12,12,0,0,0,17,17Z">
                                </path>
                            </svg>
                        </div>
                        <div class="task-count">
                            <span id="amount-urgent" class="summary-card-number"></span>
                            <span class="summary-card-label">Urgent</span>
                        </div>
                    </div>
                </div>
                <div class="divider-vertical-summary"></div>
                <div class="due-date">
                    <span id="due-date" class="summary-card-date"></span>
                    <span id="due-date-label" class="summary-card-label"></span>
                </div>
            </a>
            <div class="third-stats-section">
                <a href="../pages/board.html" id="summary-total" class="summary-card-tertiary">
                    <div class="task-count">
                        <span id="amount-total" class="summary-card-number"></span>
                        <span class="summary-card-label">Tasks in <br>Board</span>
                    </div>
                </a>
                <a href="../pages/board.html" id="summary-progress" class="summary-card-tertiary">
                    <div class="task-count">
                        <span id="amount-inprogress" class="summary-card-number"></span>
                        <span class="summary-card-label">Tasks in <br>Processes</span>
                    </div>
                </a>
                <a href="../pages/board.html" id="summary-feedback" class="summary-card-tertiary">
                    <div class="task-count">
                        <span id="amount-feedback" class="summary-card-number"></span>
                        <span class="summary-card-label">Awaiting <br>Feedback</span>
                    </div>
                </a>
            </div>
        </section>
        <section class="summary-greeting-container">
            <span id="greeting-time">Good afternoon,</span>
            <span id="greeting-username">Guest</span>
        </section>
    `;
}


/**
 * Generates the HTML content for a modal that informs users to rotate their device for better viewing.
 * The modal includes an icon, a message, and a suggestion to switch to portrait mode for optimal page display.
 * This modal is initially hidden and can be shown when the user is viewing the page in landscape mode.
 *
 * @returns {string} The HTML string representing the landscape modal content, including an icon, a message, and a caption.
 */
function getLandscapeModalContent() {
    return `
        <div id="landscape-modal" class="landscape-modal hidden">
            <div class="landscape-modal-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                    <path
                        d="M176,18H80A22,22,0,0,0,58,40V216a22,22,0,0,0,22,22h96a22,22,0,0,0,22-22V40A22,22,0,0,0,176,18ZM70,62H186V194H70ZM80,30h96a10,10,0,0,1,10,10V50H70V40A10,10,0,0,1,80,30Zm96,196H80a10,10,0,0,1-10-10V206H186v10A10,10,0,0,1,176,226Z">
                    </path>
                </svg>
                <h3>Please rotate your device!</h3>
                <figcaption>This page is best viewed in portrait mode.</figcaption>
            </div>
        </div>
    `;
}
