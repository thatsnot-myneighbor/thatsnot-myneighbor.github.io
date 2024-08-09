// Imports
import Link from 'next/link';

// Components
import Container from '@/components/Container';

import styles from './styles/Topbar.module.scss';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Topbar = () => {
    return (
        <nav className={styles.topbar}>
            <Container>
                <ul className={styles.topnav}>
                    <li>
                        <Link href="/produkter">
                            <span className="">
                                Produkter
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/kategorier">
                            <span className="">
                                Kategorier
                            </span>
                        </Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
};

export default Topbar;