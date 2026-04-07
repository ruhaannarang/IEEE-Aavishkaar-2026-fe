"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { RegistrationSchema, RegistrationFormValues } from "@/lib/validations/registration";
import { ReceiptSuccessCard } from "./ReceiptSuccessCard";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [maxMembers, setMaxMembers] = useState<number>(3);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

  useEffect(() => {
    const settingsUrl = `${apiBase}/api/settings`;
    fetch(settingsUrl)
      .then((res) => res.ok ? res.json() : Promise.reject("404"))
      .then((data) => {
        if (data.maxMembers) setMaxMembers(data.maxMembers);
      })
      .catch(() => console.warn("Using default protocol limits."));
  }, [apiBase]);

  const { register, control, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      teamName: "", leadName: "", leadEmail: "", leadPhone: "", leadUSN: "",
      teamMembers: [{ name: "", usn: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "teamMembers", control });

  // const onSubmit = async (data: RegistrationFormValues) => {
  //   setIsSubmitting(true);
  //   setErrorMsg("");

  //   try {
  //     const response = await fetch(`${apiBase}/api/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     const text = await response.text();
  //     let result;
  //     try { result = JSON.parse(text); } catch { throw new Error("NON_JSON_RESPONSE"); }

  //     if (!response.ok) {
  //       setErrorMsg(result.message || "Uplink rejected by Central Command.");
  //     } else {
  //       setSubmittedData(data);
  //       setIsSuccess(true);
  //       window.scrollTo({ top: 0, behavior: 'smooth' });
  //     }
  //   } catch (err) {
  //     setErrorMsg("CRITICAL_ERR: Data packet corrupted during transmission.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // --- MOCK BACKEND SIMULATION ---
      // 1. Simulate a 1.5 second network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Automatically trigger a "Success" state
      setSubmittedData(data);
      setIsSuccess(true);
      
      // 3. Scroll to the top to view the receipt smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      // This won't trigger in the mock, but good to keep the structure!
      setErrorMsg("CRITICAL_ERR: Data packet corrupted during transmission.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSuccess && submittedData) {
    return (
      <ReceiptSuccessCard 
        data={submittedData} 
        onReset={() => { setIsSuccess(false); setSubmittedData(null); }} 
      />
    );
  }

  return (
    <div className="w-full bg-[#0a0a0f] p-1 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      <div className="border border-white/5 p-6 sm:p-10 relative">
        {/* Cyber Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ffb000] -translate-x-[2px] -translate-y-[2px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ffb000] translate-x-[2px] -translate-y-[2px]" />
        
        <div className="mb-10 text-center">
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-2 opacity-60">
            {"// INITIALIZING_REGISTRATION_PROTOCOL_v2.0 //"}
          </p>
          <h2 className="text-3xl font-mono font-black text-white uppercase tracking-tighter">
            TEAM <span className="text-[#ffb000]">REGISTRATION</span>
          </h2>
        </div>

        {/* Global Submission Error */}
        {errorMsg && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 text-red-500 font-mono text-xs tracking-widest uppercase text-center animate-pulse">
            [SYSTEM_FAULT]: {errorMsg}
          </div>
        )}

        {/* Validation Monitor: Shows exactly what is missing if button won't click */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-3 bg-amber-900/10 border border-amber-600/50 text-amber-500 font-mono text-[10px] uppercase tracking-widest">
            &gt; STACK_TRACE: Missing or invalid fields detected. 
            <ul className="mt-1 list-inside list-disc opacity-70">
              {Object.keys(errors).map((key) => <li key={key}>{key}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Section 01: Lead Node */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-4 text-[#ffb000] font-mono font-bold text-xs tracking-[0.3em] uppercase">
              <span className="h-[1px] w-8 bg-[#ffb000]" /> 01_LEAD_DATA <span className="h-[1px] w-full bg-white/5" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-500 mb-1 block tracking-widest">TEAM_IDENTIFIER</label>
                <input {...register("teamName")} placeholder="Enter Team Name" className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-[#ffb000] outline-none transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] text-gray-500 mb-1 block tracking-widest">FULL_NAME</label>
                <input {...register("leadName")} placeholder="Lead Name" className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-[#ffb000] outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 mb-1 block tracking-widest">UPLINK_EMAIL</label>
                <input {...register("leadEmail")} type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-[#ffb000] outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 mb-1 block tracking-widest">CONTACT_NODE</label>
                <input {...register("leadPhone")} placeholder="+91 XXXXX XXXXX" className="w-full bg-white/5 border border-white/10 p-3 text-[#ffb000] font-mono focus:border-[#ffb000] outline-none" />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 mb-1 block tracking-widest">COLLEGE_ID_USN</label>
                <input {...register("leadUSN")} placeholder="1MSXXXXXXX" className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-[#ffb000] outline-none uppercase" />
              </div>
            </div>
          </div>

          {/* Section 02: Squad Nodes */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-4 text-[#ffb000] font-mono font-bold text-xs tracking-[0.3em] uppercase">
              <span className="h-[1px] w-8 bg-[#ffb000]" /> 02_SQUAD_NODES <span className="h-[1px] w-full bg-white/5" />
            </h3>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="bg-white/[0.02] border border-white/5 p-5 relative group hover:border-[#ffb000]/20 transition-all">
                  <div className="absolute -top-2 right-4 bg-[#0a0a0f] px-2 text-[9px] text-gray-600 font-mono tracking-tighter">
                    MEMBER_0{index + 1}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input {...register(`teamMembers.${index}.name`)} placeholder="Name" className="bg-transparent border-b border-white/10 p-2 text-white font-mono text-sm focus:border-[#ffb000] outline-none" />
                    <input {...register(`teamMembers.${index}.usn`)} placeholder="USN" className="bg-transparent border-b border-white/10 p-2 text-white font-mono text-sm focus:border-[#ffb000] outline-none uppercase" />
                  </div>
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(index)} className="mt-3 text-red-500/50 hover:text-red-500 text-[9px] uppercase tracking-widest transition-colors font-mono">
                      [ DELETE_NODE ]
                    </button>
                  )}
                </div>
              ))}
              
              {fields.length < maxMembers && (
                <button type="button" onClick={() => append({ name: "", usn: "" })} className="w-full py-4 border border-dashed border-white/10 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                  + APPEND_NEW_NODE
                </button>
              )}
            </div>
          </div>

          {/* Execution Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className={`w-full py-6 font-mono font-black text-sm tracking-[0.4em] uppercase transition-all duration-300 relative overflow-hidden
                ${isSubmitting 
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#ffb000] text-black hover:bg-[#ffcc00] hover:shadow-[0_0_40px_rgba(255,176,0,0.3)]'}
              `}
            >
              {isSubmitting ? "TRANSMITTING_DATA..." : "JOIN_THE_FLEET →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}