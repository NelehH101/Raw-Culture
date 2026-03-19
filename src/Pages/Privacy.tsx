import LegalLayout from '../components/LegalLayout';

const Privacy = () => (
  <LegalLayout title="PRIVACY" subtitle="PROTOCOL">
    <section className="mb-12">
      <h3>01. Information Collection</h3>
      <p>We collect information you provide directly to us (Name, Email, Coordinates). We also automatically collect certain information about your device, including your IP address and time zone.</p>
    </section>
    
    <section className="mb-12">
      <h3>02. Third-Party Integration</h3>
      <p>We use third-party processors to execute transactions. Your credit card data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). We never see your full card digits.</p>
    </section>

    <section className="mb-12">
      <h3>03. Data Retention</h3>
      <p>When you place an order through the Archive, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
    </section>

    <section className="mb-12">
      <h3>04. Your Rights</h3>
      <p>You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.</p>
    </section>
  </LegalLayout>
);

export default Privacy;