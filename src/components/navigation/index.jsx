"use client";

import { BtnList } from "@/app/data";
import { motion } from "framer-motion";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "../ResponsiveComponent";
import NavButton from "./NavButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    //staggerChildren significa che i figli del container, si animeranno uno dopo l'altro, con un ritardo di 0,3 secondi
    transition: { staggerChildren: 0.3 },
  },
};

const Navigation = () => {
  //per ottenere dei pulsanti uniformemente distanziati attorno a un cerchio.
  const angleIncrement = 360 / BtnList.length;
  const size = useScreenSize();

  const isLarge = size >= 1024;
  const isMedium = size >= 768;

  return (
    <div className="flex w-full fixed h-screen items-center justify-center">
      <ResponsiveComponent>
        {({ size }) => {
          //se size è maggiore o uguale a 480 visualizza questo div
          return size && size >= 480 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="w-max flex justify-center items-center relative animate-spin-slow hover:pause group"
            >
              {BtnList.map((btn, index) => {
                //convertire in radianti
                const angleRad = (index * angleIncrement * Math.PI) / 180;

                //raggio
                const radius = isLarge
                  ? "calc(20vw - 1rem)"
                  : isMedium
                  ? "calc(30vw - 1rem)"
                  : "calc(40vw - 1rem)";

                //coordinata x del cerchio
                const x = `calc(${radius}*${Math.cos(angleRad)})`;

                //coordinata y del cerchio
                const y = `calc(${radius}*${Math.sin(angleRad)})`;

                return <NavButton key={btn.label} x={x} y={y} {...btn} />;
              })}
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full px-2.5 xs:p-0 xs:w-max flex flex-col space-y-4 items-start xs:items-center justify-center  relative group"
              >
                {BtnList.slice(0, BtnList.length / 2).map((btn, index) => {
                  return <NavButton key={btn.label} x={0} y={0} {...btn} />;
                })}
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full px-2.5 xs:p-0 xs:w-max flex flex-col space-y-4 items-end xs:items-center justify-center  relative group"
              >
                {BtnList.slice(BtnList.length / 2, BtnList.length).map(
                  (btn, index) => {
                    return (
                      <NavButton
                        key={btn.label}
                        x={0}
                        y={0}
                        {...btn}
                        labelDirection="left"
                      />
                    );
                  }
                )}
              </motion.div>
            </>
          );
        }}
      </ResponsiveComponent>
    </div>
  );
};

export default Navigation;
