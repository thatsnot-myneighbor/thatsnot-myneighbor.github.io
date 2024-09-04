import Head from 'next/head';

// Components
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Navbar from './Navbar';

import styles from './styles/Header.module.scss';
import NavbarToggler from "@/components/Header/NavbarToggler";
import { getMenusContext } from "@/utils/hooks/ServerContext";
import {IMenu} from "@/utils/interfaces/menus";
import {findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT} from "@/utils/lib/menus";

interface IHeaderProps {
  title: string;
  searchParams?: {
    menuOpened: string;
  };
}

const Header = ({title, searchParams}: IHeaderProps) => {
  const menus: Array<IMenu> = getMenusContext();
  const navigationLocation = process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || MENU_LOCATION_NAVIGATION_DEFAULT;
  const navigation = findMenuByLocation(menus, navigationLocation);
  const actionsmenu = findMenuByLocation(menus, 'actionsmenu');

  return (
    <>
      <Head>
        <title>Next.js webshop with WooCommerce {title}</title>
        <meta name="description" content="WooCommerce webshop"/>
        <meta name="keywords" content="Ecommerce, WooCommerce"/>
        <meta
          property="og:title"
          content="Nextjs Ecommerce with Woocommerce"
          key="pagetitle"
        />
      </Head>

      <div className={styles.header}>
        <Container>
          <div className={styles.header__inner}>
            <Logo/>
            <Navbar menu={navigation} actions={actionsmenu} />
            <NavbarToggler />
          </div>
        </Container>
      </div>

    </>
  );
}

export default Header;