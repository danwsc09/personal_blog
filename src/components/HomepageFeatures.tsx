/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Informative",
    image: "/img/book-informative-removebg.png",
    description: (
      <>
        I keep these blogs mostly for my own purposes, but I do hope they can
        help you in any way possible. Feel free to reach out if you'd like.
      </>
    ),
  },
  {
    title: "Entertaining",
    image: "/img/fun-entertaining.png",
    description: (
      <>
        I strive to be entertaining so my future self and other readers won't
        find this boring to read.
      </>
    ),
  },
  {
    title: "Bilingual",
    image: "/img/globe-bilingual.png",
    description: (
      <>
        My blogs may be in Korean or English, depending on how I'm feeling at
        the time of writing. I do expect there to be a fair bit of Korean.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
