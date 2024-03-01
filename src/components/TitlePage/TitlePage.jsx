import { Helmet } from 'react-helmet-async';

export default function TitlePage({ children }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
