import {useState} from 'react';
import KeyWordBar from '../keyword-bar/KeywordBar';
import ArticlesList from '../articles-list/ArticlesList';
import ErrorBoundary from '../error-boundry/ErrorBoundry';
import Container from '@mui/system/Container';

const HomePage = () => {
  const [keywords, setKeywords] = useState<Array<string>>([]);

  function keywordsSplit(str: string): Array<string> {
    return str.trim().split(/\s|,/).filter(item => item.length > 1);    
  }

  const onKeywordsChange = (words: string):void => {
    const newKeywords = keywordsSplit(words);
    if (!(newKeywords.length === keywords.length && newKeywords.every((item, i) => item === keywords[i]))) {
      setKeywords(newKeywords);
    }  
      
  }

  return (
    <Container 
    sx={{
      paddingTop: "50px",
      paddingBottom: "50px"
    }}>
      <KeyWordBar onKeywordsChange={onKeywordsChange}/>
      <ErrorBoundary>
        <ArticlesList keywords={keywords}/>
      </ErrorBoundary>
    </Container>
  )
};

export default HomePage;