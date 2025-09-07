import { Sparkles, ShieldCheck, Users, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "We embrace creativity to design modern solutions for trade.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Every interaction is built on security and transparency.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We believe trade is about people, not just products.",
  },
  {
    icon: Rocket,
    title: "Growth",
    desc: "We create opportunities that drive progress for individuals and businesses.",
  },
];

export default function CoreValues() {
  return (
    <div id="corebg" className="w-full bg-[#30ac57] pt-15 pb-25">
      <section className="max-w-[1200px] mx-auto md:px-12 lg:px-24">
        <h3 className="text-[35px] text-[#fef6e1] font-bold max-[510px]:text-[30px] max-mobile:text-[25px] text-center mb-7">
          Our Core Values
        </h3>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2, // delay each card slightly
              },
            },
          }}
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#ffffff] w-[250px] mx-auto rounded-[30px] shadow p-6 text-center hover:shadow-md transition"
              >
                <Icon className="w-8 h-8 text-[#F89216] mx-auto mb-3" />
                <h4 className="text-[20px] font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
