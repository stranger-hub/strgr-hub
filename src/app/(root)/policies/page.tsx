export default function page() {
  const date = new Date();
  const getMonth = (month: number) => {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        break;
    }
  };
  const fullDate =
    getMonth(date.getMonth()) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear();

  return (
    <div>
      <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-base-200 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-white-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-white-600 text-sm mb-6">
              Effective Date: <span className="font-medium">{fullDate}</span>
            </p>

            <div className="space-y-6">
              <section>
                <p className="text-white-700 text-base leading-relaxed">
                  We value your privacy and are committed to protecting your
                  personal data. This Privacy Policy outlines how StrangerHub
                  collects, uses, and shares your information when you use our
                  app. By using our app, you agree to the terms of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  Information We Collect
                </h2>
                <ul className="text-white-700 text-base leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Login Information: PI provided by Auth providers (for example: Google), PI entered by user in our profile page.
                  </li>
                  <li>
                    Visible to Others: Other users will only see your name,
                    gender, and country during interactions.
                  </li>
                </ul>
                <p className="text-white-700 text-base leading-relaxed mt-4">
                  <strong>Note:</strong> We do not collect, store, or access
                  your video or chat content. All communications are securely
                  handled via Agora.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  How We Use Your Information
                </h2>
                <ul className="text-white-700 text-base leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Facilitate user connections during video streaming and
                    chatting sessions.
                  </li>
                  <li>Ensure a safe and engaging experience for users.</li>
                  <li>
                    Personalize your app experience (e.g., showing your name and
                    profile picture).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  Sharing Your Information
                </h2>
                <p className="text-white-700 text-base leading-relaxed">
                  We do not sell, rent, or share your information with third
                  parties, except in the following circumstances:
                </p>
                <ul className="text-white-700 text-base leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> We use Agora to power
                    video and chat functionalities.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> If required by law, we
                    may share your information to comply with legal obligations.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  Data Security
                </h2>
                <p className="text-white-700 text-base leading-relaxed">
                  We implement robust security measures to protect your
                  information. However, no method of electronic transmission or
                  storage is completely secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  {"Children's Privacy"}
                </h2>
                <p className="text-white-700 text-base leading-relaxed">
                  Our app is not intended for children under the age of 13. We
                  do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  Changes to This Policy
                </h2>
                <p className="text-white-700 text-base leading-relaxed">
                  {
                    'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an "Effective Date." Your continued use of the app constitutes your acceptance of any changes.'
                  }
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white-800 mb-2">
                  Contact Us
                </h2>
                <p className="text-white-700 text-base leading-relaxed">
                  If you have questions or concerns about this Privacy Policy,
                  please contact us at{" "}
                  <a
                    href="mailto:your-email@example.com"
                    className="text-blue-500 underline"
                  >
                    admin@strangerhub.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
