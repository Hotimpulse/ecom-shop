import gallery from "./gallery.module.scss";

export default function Gallery({ image, imageArr }) {
  return (
    <div className={gallery.gallery_wrapper}>
      <div className={gallery.gallery_container}>
        <div className={gallery.img_container}>
          <picture>
            <source
              srcSet={image}
              type="image/png"
              sizes="(max-width: 320px) 300px,
 (min-width: 650px) 520px,
  (min-width: 650px) 520px,
              "
            />
            <img
              loading="lazy"
              decoding="async"
              className={gallery.main_img}
              src={image}
              alt="picture of the product"
            />
          </picture>
          <div className={gallery.small_imgs}>
            {imageArr.map((image: string, index: number) => (
              <picture key={index}>
                <source
                  srcSet={imageArr[index]}
                  type="image/png"
                  sizes="(min-width: 320px) 70px"
                />
                <img
                  loading="lazy"
                  decoding="async"
                  className={gallery.small_img}
                  src={imageArr[index]}
                  alt="picture of the product"
                />
              </picture>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
