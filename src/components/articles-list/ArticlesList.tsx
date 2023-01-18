import { useEffect, useState} from "react";
import { Grid } from "@mui/material";
import ArticlesListItem from "../articles-list-item/ArticlesListItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useAPIService from "../../services/APIService";
import { ArticleInterface } from "../../services/APIService";

import './articles-list.scss';

type ArticlesListProp = {
    keywords: Array<string>
}

const ArticlesList = ({keywords}: ArticlesListProp) => {
    
    const [data, setData] = useState<Array<ArticleInterface>>([]);
    const [count, setCount] = useState<number>(0); 
    const [offset, setOffset] = useState<number>(0);
    const {loading, error, getArticles, getArticlesCount} = useAPIService();
    
    const changeData = (words:Array<string>): void => {
        getArticles(words).then(data => {
            if (words.length === 0) {
                getArticlesCount().then(setCount);
            } else {
                setCount(data.length); 
            } 
            setData(data);
            setOffset(0);            
                     
        });
    }   

    const handleScroll = (): void =>  {
        const currentPos = window.scrollY + window.innerHeight;
        if (document.body.scrollHeight - currentPos < 100) {
            setOffset(offset => offset + 6);
          }            
    }

    useEffect(() => {
        changeData(keywords);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [keywords]);

     
    const content:React.ReactNode = data.slice(0, 6 + offset).map(item => {
        return(
            <Grid item xs={12} md={4} sm={6} key = {item.id}>
                 <ArticlesListItem article={item}  keywords={keywords}/>
            </Grid>
        )});
    
    
    return (
        <>
            <div className="articles-list__summary-bar">
                {loading && 'Loading...'}
                {(error !== null) && 'Error'}
                {!(loading || error) && `Results: ${count}`}
            </div>
            {(error !== null) && <Error/>}
            {(!(error || loading) && (data.length > 0)) ?
            <Grid 
                container 
                spacing={4}
                alignItems="stretch"
                sx={{
                    marginTop: '0px'
                }}>
                    {content}
            </Grid> : null
            }
            {loading && <Spinner/>}
        </>
    )
};

export default ArticlesList;