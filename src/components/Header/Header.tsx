import Head from 'next/head';

// Components
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Navbar from './Navbar';

import styles from './styles/Header.module.scss';
import NavbarToggler from "@/components/Header/NavbarToggler";
import {unstable_noStore} from "next/cache";

interface IHeaderProps {
  title: string;
  searchParams?: {
    menuOpened: string;
  };
}

const Header = ({title, searchParams}: IHeaderProps) => {
  unstable_noStore();

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
            <Navbar />
            <NavbarToggler />
          </div>
        </Container>
      </div>

    </>
  );
}

export default Header;