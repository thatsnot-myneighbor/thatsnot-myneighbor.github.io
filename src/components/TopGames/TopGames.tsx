'use client';

import styles from './styles/TopGames.module.scss';
import {IPostCard} from "@/utils/interfaces/posts";
import TopGame from './TopGame';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react'

type TTopGamesProps = {
  posts: IPostCard[],
}

const TopGames = ({posts}: TTopGamesProps) => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  useEffect(() => {
    setSlidesPerView(calcSlidesPerView());
  }, []);

  function calcSlidesPerView() {
    let view = 2;

    if (window.innerWidth > 1024) {
      view = 10;
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      view = 8;
    } else if (window.innerWidth < 768 && window.innerWidth > 640) {
      view = 6;
    } else if (window.innerWidth < 640 && window.innerWidth > 460) {
      view = 4;
    } else if (window.innerWidth < 460 && window.innerWidth > 320) {
      view = 3;
    }

    return view;
  }

  return (
    <section className={styles.topGames}>

      <div
        className={styles.sideWidget}
      >
        <div className={styles.topGames__items}>
          <Swiper
            spaceBetween={10}
            slidesPerView={slidesPerView}
            navigation={true}
            modules={[Navigation]}
          >
            {posts.map((post) => {
              return (
                <SwiperSlide key={post.slug}>
                  <TopGame
                    post={post}
                    key={post.slug}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TopGames;
