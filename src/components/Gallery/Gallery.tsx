import { IGallery } from "@src/interfaces/IGallery";
import gallery from "./gallery.module.scss";
import { useState } from "react";

export default function Gallery({ image, imageArr }: IGallery) {
  const [mainImg, setMainImg] = useState<string>(image);

  const handleImageChange = (image: string) => {
    setMainImg(image);
  };

  return (
    <div className={gallery.gallery_wrapper}>
      <div className={gallery.gallery_container}>
        <div className={gallery.img_container}>
          <picture>
            <source
              srcSet={mainImg}
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
              src={mainImg}
              alt="picture of the product"
            />
          </picture>

          <div className={gallery.small_imgs}>
            {imageArr &&
              imageArr.map((image: string, index: number) => (
                <picture
                  key={index}
                  className={gallery.pic_container}
                  onClick={() => handleImageChange(image)}
                >
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
