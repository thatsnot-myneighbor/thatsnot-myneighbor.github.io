// Imports
import Link from 'next/link';

// Components
import Navmenu from './Navmenu';

import styles from './styles/Navbar.module.scss';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div
                className={styles.navbar__menu}
            >
                <Navmenu />
            </div>

            <div className={styles.navbar__actions}>
                <ul id="menu-actions" className="actions">
                    <li id="menu-item-106" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-106"><a href="https://raft-v1.local/c/new-games/">New games</a></li>
                    <li id="menu-item-107" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-107"><a href="https://raft-v1.local/c/best-games/">Best games</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;