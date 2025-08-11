"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const carRef = useRef(null);
  const bikeRef = useRef(null);
  const donutRef = useRef(null);
  const donutBoxRef = useRef(null);
  const directionRef = useRef(1);

  // Initialize ScrollSmoother
  useEffect(() => {
    // Avoid SSR errors
    if (typeof window !== "undefined") {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // seconds it takes to "catch up" to native scroll
        effects: true, // look for data-speed and data-lag attributes
      });
    }
  }, []);

  // Scroll-based animations (car and car title)
  useEffect(() => {
    if (!carRef.current) return;

    gsap.to(carRef.current, {
      x: 1000,
      scrollTrigger: {
        trigger: carRef.current,
        start: 100,
        end: 600,
        scrub: true,
      },
    });

    gsap.fromTo(
      ".car_title",
      {
        y: 200,
        x: -800,
        opacity: 0,
      },
      {
        x: 0,
        y: 500,
        opacity: 1,
        scrollTrigger: {
          trigger: ".car_title",
          start: 100,
          end: 600,
          scrub: true,
        },
      }
    );
  }, []);

  // Donut and heading animation
  useGSAP(() => {
    gsap.from(".main-heading", {
      y: -200,
      duration: 1.4,
    });

    gsap.from(donutBoxRef.current, {
      opacity: 0.5,
      scale: 0.5,
      duration: 2.4,
    });

    gsap.to(donutRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 360,
      repeat: -1,
      duration: 2.8,
      ease: "linear",
      rotation: "+=360",
    });

    gsap.fromTo(
      ".pushpa",
      { opacity: 1, scale: 0.5 },
      {
        opacity: 0,
        scale: 2.5,
        duration: 2.5,
        // repeat: -1,
        yoyo: true,
        ease: "expoScale(1, 5)",
        scrollTrigger: {
          trigger: ".pushpa",
          start: 1350,
          end: 1800,
          scrub: true,
        },
      }
    );

    gsap.from(".motive-text", {
      y: -600,
      opacity: 0,
      duration: 6.4,
      ease: 'linear',
      scrollTrigger: {
        trigger: ".motive-text",
        start: 1800,
        end: 2000,
        scrub: true,
      },
    });

    gsap.to(".liquid", {
      rotate: 360,
      duration: 0.1,
      ease: "linear",
      yoyo: true,
      scrollTrigger: {
        trigger: ".liquid",
        start: 1800,
        end: 2400,
        scrub: true,
      },
    });
  }, []);

  // Bike animation with direction flip
  useGSAP(() => {
    gsap.to(bikeRef.current, {
      x: 1200,
      duration: 4.2,
      ease: "linear",
      repeat: -1,
      yoyo: true,
      onStart: () => {
        gsap.set(bikeRef.current, { scaleX: 1 }); // Face right initially
      },
      onRepeat: () => {
        directionRef.current *= -1;
        gsap.set(bikeRef.current, { scaleX: directionRef.current });
      },
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        className="font-orbitron grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
      >
        {/* Heading */}
        <section className="container mx-auto">
          <h2 className="text-white text-6xl font-medium text-center main-heading">
            Scroll Down
          </h2>
        </section>

        {/* Donut */}
        <section ref={donutBoxRef} className="w-full flex justify-center">
          <Image
            ref={donutRef}
            src="/donut.png"
            width={500}
            height={500}
            alt="donut"
          />
        </section>

        {/* Car Animation */}
        <section className="container mx-auto w-full mt-28">
          <h2 className="text-white text-6xl font-medium !leading-24 max-w-[720px] car_title">
            This <span className="text-red-600">Supercar</span> Might Hit you
            Hard!
          </h2>
          <Image
            ref={carRef}
            src="/car.png"
            width={600}
            height={600}
            alt="car"
          />
        </section>

        {/* Bike Animation */}
        <section className="container mx-auto w-full mt-96">
          <Image
            ref={bikeRef}
            src="/bike.png"
            width={500}
            height={500}
            alt="bike"
          />
        </section>

        {/* Extra Images */}
        <section className="w-full mt-20 flex justify-center">
          <Image
            className="pushpa"
            src="/pushpa.png"
            width={500}
            height={500}
            alt="pushpa"
          />
        </section>

        <section className="flex justify-center items-center gap-32 container mx-auto w-full pb-96">
          <div className="text-gray-50 max-w-96 motive-text">
            <h2 className="text-4xl leading-12">Adventure begins where comfort ends.</h2>
            <p className="text-sm mt-3">
              means that the real thrill of life starts when you step outside
              your comfort zone. It’s about embracing the unknown, challenging
              yourself, and experiencing the excitement that comes from new,
              sometimes uncomfortable, situations—whether it’s traveling to
              unexplored places, trying daring activities, or simply taking a
              bold step toward your dreams.
            </p>
          </div>

          <Image className="liquid" src="/liquid.png" width={500} height={500} alt="liquid" />
        </section>

      </div>
    </div>
  );
}
