import LegalLayout from '../components/LegalLayout';

const Cookies = () => (
  <LegalLayout title="COOKIE" subtitle="MANIFEST">
    <section className="mb-12">
      <h3>01. Necessary Cookies</h3>
      <p>These are essential for the Archive to function. They allow you to navigate the site and use features like the "Secure Cart" and "Execute Transaction" modules.</p>
    </section>
    
    <section className="mb-12">
      <h3>02. Performance Cookies</h3>
      <p>These cookies collect information about how visitors use the website, for instance, which pages visitors go to most often. They do not collect information that identifies a visitor.</p>
    </section>

    <section className="mb-12">
      <h3>03. Targeted Advertising</h3>
      <p>We may use cookies to deliver adverts more relevant to you and your interests based on your archival browsing history.</p>
    </section>

    <section className="mb-12">
      <h3>04. Managing Cookies</h3>
      <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
    </section>
  </LegalLayout>
);

export default Cookies;