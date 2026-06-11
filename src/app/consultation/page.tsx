'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Globe, Video, MessageSquare, CheckCircle, Calendar, Shield, ChevronRight } from 'lucide-react';
import { doctors } from '@/data/index';
import { toast } from 'sonner';
import SectionHeader from '@/components/shared/SectionHeader';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const consultTypes = [
  { id: 'video', icon: Video, label: 'Video Call', price: '₹299', desc: 'Face-to-face video consultation' },
  { id: 'chat', icon: MessageSquare, label: 'Chat', price: '₹199', desc: 'Text-based consultation' },
  { id: 'call', icon: Clock, label: 'Phone Call', price: '₹249', desc: 'Voice consultation' },
];

const concerns = ['General Wellness', 'Digestive Issues', 'Joint Pain', 'Skin Problems', 'Hair Loss', 'Diabetes', 'Stress & Anxiety', 'Weight Management', 'Women\'s Health', 'Sleep Issues'];

const process = [
  { step: '1', title: 'Choose Your Doctor', desc: 'Browse our panel of certified Ayurvedic and Unani specialists.' },
  { step: '2', title: 'Select Time & Mode', desc: 'Pick a convenient slot and consultation mode (video/chat/call).' },
  { step: '3', title: 'Share Health Details', desc: 'Fill a brief form about your symptoms and health history.' },
  { step: '4', title: 'Get Consultation', desc: 'Connect with your doctor and receive personalized health advice.' },
  { step: '5', title: 'Receive Prescription', desc: 'Get a digital prescription with recommended products and lifestyle tips.' },
];

export default function ConsultationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('video');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleBook = () => {
    if (!selectedDoctor || !selectedSlot || !selectedConcern) {
      toast.error('Please complete all selections');
      return;
    }
    toast.success('Consultation booked! Check your email for confirmation.');
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20">
        <div className="container-custom text-center">
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase">Expert Healthcare</span>
          <h1 className="font-display text-5xl lg:text-6xl mt-4 mb-6">
            Consult Certified<br />Ayurvedic Doctors
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
            Get personalized health advice from India&apos;s top Ayurvedic and Unani specialists.
            Consultations from ₹199.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
            {['50+ Expert Doctors', '24/7 Availability', '1M+ Consultations', 'Instant Prescription'].map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <div className="bg-accent border-b border-gray-100">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Video, title: 'Video Consultation', desc: 'HD video calls with doctors' },
              { icon: Shield, title: 'Certified Doctors', desc: 'BAMS & BUMS qualified' },
              { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book at your convenience' },
              { icon: Clock, title: 'Quick Connect', desc: 'Wait time under 15 minutes' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{title}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Doctor Selection */}
          <div>
            <SectionHeader
              eyebrow="Step 1"
              title="Choose Your Doctor"
              align="left"
            />
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {doctors.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`card-luxury p-5 text-left transition-all ${
                    selectedDoctor === doc.id ? 'ring-2 ring-primary shadow-luxury' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image src={doc.avatar} alt={doc.name} fill className="rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900">{doc.name}</div>
                      <div className="text-primary text-xs font-medium mt-0.5">{doc.specialization}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span className="text-xs font-medium text-gray-700">{doc.rating}</span>
                        <span className="text-xs text-gray-400">· {doc.experience} yrs exp</span>
                      </div>
                    </div>
                    {selectedDoctor === doc.id && (
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {doc.languages.slice(0, 3).map(lang => (
                      <span key={lang} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Health Concern */}
            <div className="mt-12">
              <SectionHeader
                eyebrow="Step 2"
                title="Select Your Health Concern"
                align="left"
              />
              <div className="flex flex-wrap gap-3 mt-6">
                {concerns.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedConcern(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedConcern === c
                        ? 'bg-primary text-white'
                        : 'bg-accent text-gray-700 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-16">
              <SectionHeader
                eyebrow="Process"
                title="How It Works"
                align="left"
              />
              <div className="mt-8 space-y-4">
                {process.map((p, i) => (
                  <div key={p.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                      {p.step}
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                      <div className="font-semibold text-gray-900">{p.title}</div>
                      <div className="text-gray-600 text-sm mt-0.5">{p.desc}</div>
                    </div>
                    {i < process.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mt-3" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card-luxury p-6">
              <h3 className="font-display text-xl text-gray-900 mb-6">Book Consultation</h3>

              {/* Consultation Type */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Consultation Mode</div>
                <div className="space-y-2">
                  {consultTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        selectedType === type.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedType === type.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <type.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-sm">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.desc}</div>
                      </div>
                      <span className="font-bold text-primary text-sm">{type.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Select Date</div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                    <button key={d} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary/10'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Available Slots</div>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                        selectedSlot === slot ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {(selectedDoctor || selectedSlot) && (
                <div className="mb-6 p-4 bg-primary/5 rounded-xl text-sm">
                  {selectedDoctor && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Doctor</span>
                      <span className="font-medium text-gray-900">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                    </div>
                  )}
                  {selectedSlot && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium text-gray-900">{selectedSlot}, Today</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-primary/10 pt-2 mt-2">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-primary">{consultTypes.find(t => t.id === selectedType)?.price}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBook}
                className="w-full btn-primary py-4 font-semibold"
              >
                Book Consultation
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                By booking, you agree to our terms of service. 100% secure payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
