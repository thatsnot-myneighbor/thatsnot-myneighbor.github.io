// Imports
import Link from 'next/link';
import { getMenusContext } from "@/utils/hooks/ServerContext";
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from '@/utils/lib/menus';

// Components
import NavListItem from '@/components/NavListItem';

import styles from './styles/Navmenu.module.scss';
import { IMenu } from '@/utils/interfaces/menus';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navmenu = () => {
    const menus: Array<IMenu> = getMenusContext();

    const navigationLocation = process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || MENU_LOCATION_NAVIGATION_DEFAULT;
    const navigation = findMenuByLocation(menus, navigationLocation);

    return (
        <ul className={styles.navmenu}>
            {navigation?.map((listItem) => {
                return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
            })}
        </ul>
    );
};

export default Navmenu;