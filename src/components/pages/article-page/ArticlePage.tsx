import { useParams, Link as RouterLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Container, Paper, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ArticleInterface } from '../../../services/APIService';
import useAPIService from '../../../services/APIService';
import Spinner from '../../spinner/Spinner';
import Error from '../../error/Error';

import './article-page.scss';

const ArticlePage = () => {
    const {id} = useParams();
    const {getOneArticle, loading, error} = useAPIService();
    const [article, setArticle] = useState<ArticleInterface>();

    const articleLoad = (): void => {
        if (id) {
           getOneArticle(id).then(setArticle);
        }
    }

    useEffect(articleLoad, []);

    return (
        <>
            {loading && <Spinner/>}
            {(error !== null) && <Error/>}
            {(!(loading || error) && (!!article)) ? <View {...article}/> : null
            }
        </>
    )
}

const View = ({title, description, image} : ArticleInterface) => {

    return (
        <div className="article-page">
            <img src={image} alt={title} className="article-page__image" />
            <Container
            sx={{
                marginTop: "150px",
                marginBottom: "50px"
            }}>
                <Paper
                elevation={0}
                variant="outlined"
                sx={{
                    borderColor: "#EAEAEA",
                    borderRadius: "5px",
                    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.05)",
                    padding: "35px 75px"

                }}>
                    <h1>{title}</h1>
                    <div className="article-page__description">{description}</div>
                </Paper>            
            </Container>
            <Container
            >
                <div className="article-page__link">
                    <Link 
                        component={RouterLink}
                        to="/" 
                        underline="hover" 
                        color="#363636"
                        sx={{fontWeight: "bold"}}
                        >
                                <ArrowBackIcon 
                                sx={{
                                    fontSize: "16px",
                                    position:"relative",
                                    top: "3px",
                                    right: "5px"
                                }}/>
                            Back to homepage 
                    </Link>
                </div>
            </Container>
        </div>
    )
}
export default ArticlePage;