import { CSSProperties } from 'react'
import styles from './Image.module.scss'

interface ImageProps {
  src: string
  alt: string
  aspectRatio?: string // например, '16/9', '1/1', '4/3'
  maxWidth?: string
  maxHeight?: string
  className?: string
}

export const Image = ({
  src,
  alt,
  aspectRatio = '16/9',
  maxWidth = '100%',
  maxHeight = '100%',
  className = ''
}: ImageProps) => {
  const style: CSSProperties = {
    aspectRatio,
    maxWidth,
    maxHeight,
    width: '100%',
    objectFit: 'none',
    borderRadius: 'inherit'
  }

  return <img src={src} alt={alt} style={style} className={`${styles.image} ${className}`} />
}
