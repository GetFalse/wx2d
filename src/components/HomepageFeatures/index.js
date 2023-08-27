import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '建站初衷',
    description: (
      <>
        我是平平无奇的后端开发，想在互联网上留下属于自己的那一坨...当然是看的见的，
        作为后端看不见的已经有很多了。工作的枯燥让我想做点有意思的东西，所以这段时间
        一直有进行微信小程序的开发，在找相关文档或者资料时，总是需要大量时间精力，
        既然已经踩过坑了，那就沉淀整理出来，帮助其他开发者少走弯路。
      </>
    ),
  },
  {
    title: '本站内容',
    description: (
      <>
        基于我现在所经历的开发流程，目前主要分为四大块，微信小程序，微信公众号，微信开放平台以及微信支付。
        后续可能还会调整补充。最后可能还包括我深夜的一些思考或者丧，可能没有营养，但会一定不会长胖。
      </>
    ),
  },
  {
    title: '终极目标',
    description: (
      <>
        3分钟解决你微信开发上遇到的所有问题，快且全，真是一个让人兴奋的目标呢，让人开心的是现在离这个目标还差这个目标的距离，
        但我会坚持（小tip：域名我直接续了10年）同时希望大家也能贡献自己的经验。如果最后能赚到钱，那我会笑醒的。当然不赚钱我也会维护下去，
        前面也说了，我想在互联网上留下属于自己那的一坨...
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
