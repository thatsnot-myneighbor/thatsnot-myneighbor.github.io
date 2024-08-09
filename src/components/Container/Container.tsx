import styles from './styles/Container.module.scss';

interface IContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
