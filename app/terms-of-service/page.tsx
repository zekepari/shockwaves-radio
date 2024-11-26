export default function Page() {
  const effectiveDate = new Date(1732589042 * 1000).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container max-w-screen-lg">
      <h1 className="text-4xl font-bold mb-6">Shockwaves Radio Terms and Conditions of Use</h1>
      <p className="mb-4">Effective Date: {effectiveDate}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">1. Restrictions on Use</h2>
        <p>
          By accessing or using the Shockwaves Radio website located at{' '}
          <a href="https://shockwavesradio.com" className="text-blue-500">
            https://shockwavesradio.com
          </a>
          , you agree not to:
        </p>
        <ul className="list-disc ml-6">
          <li>Download, copy, modify, or distribute any materials for personal or commercial use.</li>
          <li>Alter or duplicate the materials in any way.</li>
          <li>Use the materials for commercial purposes or public display without authorization.</li>
          <li>Reverse-engineer, decompile, or disassemble any software on the website.</li>
          <li>Remove any copyright or proprietary notices.</li>
          <li>Transfer or &quot;mirror&quot; the materials on any other server.</li>
        </ul>
        <p>
          Any violation of these restrictions may result in the termination of your access to the website. Upon
          termination, your rights to view any materials will cease immediately, and you must destroy any downloaded
          materials in your possession.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">2. Disclaimer of Warranties</h2>
        <p>
          The materials on the Shockwaves Radio website are provided &quot;as is&quot; without any warranty, express or implied.
          Shockwaves Radio does not guarantee the accuracy, completeness, or reliability of the materials or content on
          the website. We disclaim all warranties, including implied warranties of merchantability or fitness for a
          particular purpose.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">3. Limitation of Liability</h2>
        <p>
          In no event shall Shockwaves Radio or its suppliers be liable for any damages arising from the use or inability
          to use the services on the website, even if Shockwaves Radio has been advised of the possibility of such damages.
          Some jurisdictions do not allow limitations on implied warranties or liability for incidental damages; therefore,
          these limitations may not apply to you.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">4. Errata and Revisions</h2>
        <p>
          The materials on the website may contain errors or inaccuracies. Shockwaves Radio reserves the right to make
          changes to the website at any time without prior notice. We do not commit to updating the materials on the
          website and disclaim any obligation to do so.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">5. Links to Other Websites</h2>
        <p>
          The website may contain links to third-party websites. These links are provided for convenience and do not imply
          endorsement by Shockwaves Radio. We are not responsible for the content of any linked sites. You access these
          external sites at your own risk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">6. Modifications to Terms of Use</h2>
        <p>
          Shockwaves Radio reserves the right to modify these Terms and Conditions at any time without prior notice.
          By continuing to use this website, you agree to be bound by the most current version of these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">7. Privacy Information</h2>
        <p>Your privacy is very important to us. By using the Shockwaves Radio website, you agree to the collection, use, and disclosure of your personal information as described in our Privacy Policy.</p>
        <ul className="list-disc ml-6">
          <li>We may collect personal information such as your name, email address, and contact details.</li>
          <li>We use this information to provide services, process transactions, and communicate with you.</li>
          <li>We do not store your personal data beyond the completion of the relevant service.</li>
          <li>We will not sell or share your personal information except as required by law.</li>
        </ul>
        <p>If you wish to access, correct, or delete your personal information, please contact us directly.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">8. Governing Law</h2>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of Great Britain, without regard
          to its conflict of law provisions. By using this website, you consent to the exclusive jurisdiction and venue of
          the courts located in Great Britain for any disputes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">9. Merchandise Policy</h2>
        <p>Shockwaves Radio may offer merchandise for sale. By purchasing merchandise, you agree to the following:</p>
        <ul className="list-disc ml-6">
          <li>Information collected for merchandise orders is used solely for order fulfillment.</li>
          <li>We use third-party payment processors and do not store payment information on our servers.</li>
          <li>Shipping information is collected only for delivery purposes and will not be shared with Shockwaves Radio.</li>
          <li>We are unable to offer refunds or exchanges on merchandise purchased through third-party suppliers.</li>
        </ul>
        <p>By purchasing, you consent to the collection and use of your information as outlined in this policy.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">10. Contact Information</h2>
        <p>
          For any questions regarding these Terms and Conditions or our Privacy Policy, please contact us at{' '}
          <a href="mailto:contact@shockwavesradio.com" className="text-blue-500">
            support@shockwavesradio.com
          </a>.
        </p>
      </section>
    </div>
  );
};
