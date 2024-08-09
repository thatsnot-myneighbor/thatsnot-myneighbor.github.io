import ClassName from '@/utils/models/classname';

import styles from './styles/Image.module.scss';
import {ReactNode} from "react";

type TImageProps = {
  children?: ReactNode
  className?: ClassName
  width?: string
  height?: string
  src: string
  alt: string
  [propName: string]: any
}

const Image = ({
  children,
  className,
  width = '100%',
  height = 'auto',
  src,
  alt,
  srcSet,
  sizes,
  dangerouslySetInnerHTML,
}: TImageProps) => {
  const imageClassName = new ClassName(styles.image);

  imageClassName.addIf(className, className);

  return (
    <figure className={imageClassName.toString()}>
      <div className={styles.featuredImageImg}>
        <img width={width} height={height} src={src} alt={alt || ''} srcSet={srcSet} sizes={sizes} />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Image;
