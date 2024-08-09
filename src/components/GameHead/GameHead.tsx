import styles from './styles/GameHead.module.scss';
import FeaturedImage from '@/components/FeaturedImage';
import {ReactNode} from "react";

type TGameHeadProps = {
    children: ReactNode,
    className?: string,
    title?: string,
    [x:string]: any;
}

const Header = ({ children }: TGameHeadProps) => {
    return (
        <div className={styles.gameHead}>
            {children}
            <div className={styles.gameHead__likes}>
                Likes
            </div>
            <div className={styles.gameHead__rating}>
                Rating
            </div>
        </div>
    );
};

export default Header;
