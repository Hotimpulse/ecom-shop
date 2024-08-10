import gallery from "./gallery.module.scss";

export default function Gallery() {
  return (
    <div className={gallery.gallery_wrapper}>
      <div className={gallery.gallery_container}>
        <div className={gallery.img_container}>
          <picture>
            <source
              srcSet="/src/assets/pics/gallery_shoe_pic.avif"
              type="image/avif"
            />
            <img
              loading="lazy"
              decoding="async"
              className={gallery.main_img}
              src="/src/assets/pics/gallery_shoe_pic.avif"
              alt="picture of the product"
            />
          </picture>
          <div className={gallery.small_imgs}>
            {Array.from({ length: 6 }).map((_, index) => (
              <picture key={index}>
                <source
                  srcSet="/src/assets/pics/gallery_shoe_pic.avif"
                  type="image/avif"
                />
                <img
                  loading="lazy"
                  decoding="async"
                  className={gallery.small_img}
                  src="/src/assets/pics/gallery_shoe_pic.avif"
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
