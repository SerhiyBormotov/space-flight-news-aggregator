import KeyWordBar from '../keyword-bar/KeywordBar';
import ArticlesList from '../articles-list/ArticlesList';
import ErrorBoundary from '../error-boundry/ErrorBoundry';
import Container from '@mui/system/Container';

const HomePage = () => {

  return (
    <Container 
    sx={{
      paddingTop: "50px",
      paddingBottom: "50px"
    }}>
      <KeyWordBar/>
      <ErrorBoundary>
        <ArticlesList/>
      </ErrorBoundary>
    </Container>
  )
};

export default HomePage;