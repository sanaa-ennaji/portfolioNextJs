"use client";

import { useRef, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+212) 630 718 753",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "sanaaennaji93@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Morocco",
  },
];

const Contact = () => {
  const formRef = useRef(null); // Create a reference for the form

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Check if all fields are filled
    if (
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("message")
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }

    // Validate email format (extra layer)
    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email format.",
        icon: "error",
      });
      return;
    }

    // Proceed with form submission
    formData.append("access_key", "db3b3330-c05f-46f5-9b82-c89cffd97857");
    const json = JSON.stringify(Object.fromEntries(formData));

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();
    if (result.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
      formRef.current.reset(); // Reset the form
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  }

  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12"
    >
      <div className="container mx-auto">
        <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-[30px]">
          {/* text */}
          <div className="w-full max-w-[500px] flex flex-col gap-6">
            {/* message */}
            <div className="flex flex-col justify-center items-center gap-2 rounded-xl p-[30px] border border-accent/10 border-dashed">
              <h3 className="h3 text-center w-full">Let's connect!</h3>
              <p className="p max-w-[336px] mx-auto text-center">
                Reach out to discuss opportunities, projects, or simply to start
                a conversation.
              </p>
            </div>
            {/* info */}
            <div className="flex flex-col items-center justify-center rounded-xl p-8 border border-accent/10 border-dashed">
              <ul className="flex flex-col gap-[34px]">
                {info.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-6">
                      <div className="w-[52px] h-[52px] xl:w-[70px] xl:h-[70px] bg-secondary text-accent rounded-md flex items-center justify-center">
                        <div className="text-[28px]">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <p className="uppercase text-white">{item.title}</p>
                        <h3 className="font-secondary text-lg text-white/60">
                          {item.description}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* form */}
          <div className="w-full max-w-[500px]">
            <form
              ref={formRef} // Attach the reference to the form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-8 bg-secondary rounded-xl"
            >
              <p className="text-[16px] uppercase text-white/60">
                Fill out the form below to get in touch:
              </p>
              <Input name="name" type="text" placeholder="Your name" required />
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here!"
                required
              />
              <Button type="submit" size="md" className="max-w-40 uppercase">
                Send email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;