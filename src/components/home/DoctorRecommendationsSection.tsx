"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Globe, ArrowRight } from "lucide-react";
import { doctors } from "@/data/index";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatPrice } from "@/lib/utils";

export default function DoctorRecommendationsSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Expert Guidance"
          title="Consult Our"
          titleHighlight="Certified Doctors"
          description="Get personalized Ayurvedic and Unani health advice from experienced practitioners — online, in minutes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-luxury p-5 text-center group hover:border hover:border-primary-100 transition-all"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden">
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${doctor.available ? "bg-green-400" : "bg-gray-300"}`} />
              </div>

              {/* Info */}
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{doctor.name}</h3>
              <p className="text-xs text-gray-500 mb-1">{doctor.title}</p>
              <p className="text-xs font-medium text-primary-500 mb-3">{doctor.specialization}</p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-secondary text-secondary" />
                  {doctor.rating}
                </span>
                <span>·</span>
                <span>{doctor.experience}y exp</span>
              </div>

              {/* Languages */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
                {doctor.languages.slice(0, 2).map((lang) => (
                  <span key={lang} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Fee & CTA */}
              <div className="text-xs text-gray-500 mb-3">
                Consultation from{" "}
                <span className="font-bold text-gray-900">{formatPrice(doctor.fee)}</span>
              </div>

              <Link
                href={`/consultation?doctor=${doctor.id}`}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  doctor.available
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {doctor.available ? (
                  <>
                    <Clock size={12} />
                    Book Appointment
                  </>
                ) : (
                  "Currently Unavailable"
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/consultation" className="btn-secondary inline-flex items-center gap-2">
            View All Doctors
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
