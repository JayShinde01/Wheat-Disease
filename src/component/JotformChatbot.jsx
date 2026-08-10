import { useEffect } from "react";

function JotformChatbot() {

    useEffect(() => {

        if (
            document.getElementById("jotform-chatbot")
        ) {
            return;
        }

        // ==============================
        // INLINE CSS
        // ==============================

        const style =
            document.createElement("style");

        style.id = "jotform-chatbot-style";

        style.innerHTML = `
            iframe[src*="jotform"],
            iframe[src*="jotfor.ms"] {
                bottom: 80px !important;
            }
        `;

        document.head.appendChild(style);


        // ==============================
        // JOTFORM SCRIPT
        // ==============================

        const script =
            document.createElement("script");

        script.id = "jotform-chatbot";

        script.src =
            "https://cdn.jotfor.ms/agent/embedjs/019b02bac0887d99ae37356ecd239e719a6b/embed.js";

        script.async = true;

        document.body.appendChild(script);


        // ==============================
        // WATCH DYNAMIC ELEMENTS
        // ==============================

        const observer =
            new MutationObserver(() => {

                const elements =
                    document.querySelectorAll(
                        'iframe[src*="jotform"], iframe[src*="jotfor.ms"]'
                    );

                elements.forEach((element) => {

                    element.style.setProperty(
                        "bottom",
                        "80px",
                        "important"
                    );

                });

            });


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );


        // ==============================
        // CLEANUP
        // ==============================

        return () => {

            observer.disconnect();

            const existingScript =
                document.getElementById(
                    "jotform-chatbot"
                );

            if (existingScript) {
                existingScript.remove();
            }


            const existingStyle =
                document.getElementById(
                    "jotform-chatbot-style"
                );

            if (existingStyle) {
                existingStyle.remove();
            }

        };

    }, []);


    return null;
}

export default JotformChatbot;