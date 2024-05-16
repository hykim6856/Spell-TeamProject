"use client";
import { useEffect, useState } from "react";
import { spellCheck } from "@/api/nspellr_api";

const SpellResult = ({ text, setRes }) => {
  const [sres, setSres] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await spellCheck(text);

        setSres(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [text]);

  return <div id="displayText">{sres}</div>;
};

export default SpellResult;
