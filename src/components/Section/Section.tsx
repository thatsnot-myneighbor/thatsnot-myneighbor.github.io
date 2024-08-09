import ClassName from '@/utils/models/classname';

import styles from './styles/Section.module.scss';
import SectionHeading from './SectionHeading';
import { ReactNode } from 'react';

type TSectionProps = {
    children: ReactNode,
    className?: string,
    title?: string,
    [x:string]: any;
}

const Section = ({ children, title = '', className, ...rest }: TSectionProps) => {
    const sectionClassName = new ClassName(styles.section);

    sectionClassName.addIf(className, className);

    return (
        <section className={sectionClassName.toString()} {...rest}>
            {title && <SectionHeading>{title}</SectionHeading>}
            {children}
        </section>
    );
};

export default Section;
