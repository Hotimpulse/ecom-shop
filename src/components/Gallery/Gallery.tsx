import gallery from "./gallery.module.css";

export default function Gallery() {
  return (
    <div className={gallery.gallery_wrapper}>
      <div className={gallery.gallery_container}>
        <div className={gallery.img_container}>
          <img
            className={gallery.main_img}
            src="/src/assets/pics/gallery_hoe_pic.png"
            alt="main gallery picture"
          />
          <div className={gallery.small_imgs}>
            {Array.from({ length: 6 }).map(() => (
              <img
                className={gallery.small_img}
                src="/src/assets/pics/gallery_hoe_pic.png"
                alt="picture of the product"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
