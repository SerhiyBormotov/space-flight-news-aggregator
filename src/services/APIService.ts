import { useHttp } from "../hooks/http.hook";

export interface ArticleInterface {
    id: number,
    image: string,
    title: string,
    description: string,
    published: string
}

interface APIRequestInterface {
    id: number,
    imageUrl: string,
    title: string,
    summary: string,
    publishedAt: string,
    [propName: string]: any
}

const useAPIService = () => {
    const _apiBase: string = "https://api.spaceflightnewsapi.net/v3/";

    const { getRequest, abortRequestSafe} = useHttp();

    let oldKeywords: string = "";
 
    const getArticles = async (keywords:Array<string>, offset:number = 0): Promise<Array<ArticleInterface>> => {
        console.log('pending');
        abortRequestSafe(oldKeywords);    
        
        let limit:number = 0;
        if (keywords.length === 0) {        //App doesn`t load all the articles if there are no filter keywords
            limit = 100;
        } else {
            limit = await getArticlesCount();
        } 
        let queryTitleText: string = `${_apiBase}articles?_limit=${limit}&_start=${offset}`,
            queryDescriptionText: string = `${_apiBase}articles?_limit=${limit}&_start=${offset}`;
        keywords.forEach(item => {
            queryTitleText += `&title_contains=${item}`;
            queryDescriptionText += `&summary_contains=${item}`;
        });
        console.log("request");
        oldKeywords = keywords.join(' ');
        const resTitle = await getRequest<Array<APIRequestInterface>>(queryTitleText, oldKeywords),
              resDescription = await getRequest<Array<APIRequestInterface>>(queryDescriptionText, oldKeywords);
        return [...resTitle.map(_transformData), ...resDescription.map(_transformData).filter(item => resTitle.every(elem => item.id !== elem.id))];       
    }

    const getArticlesCount = async (): Promise<number> => {
        return await getRequest<number>(`${_apiBase}articles/count`);
    }

    const getOneArticle = async (id:string): Promise<ArticleInterface> => {
        const res = await getRequest<APIRequestInterface>(`${_apiBase}articles/${id}`);
        return _transformData(res);
    }

    const _transformData = (data:any): ArticleInterface => {
        return {
            id: data.id,
            title: data.title,
            image: data.imageUrl,
            description: data.summary,
            published: data.publishedAt

        }
    }

    return {getArticles, getArticlesCount, getOneArticle}
}

export default useAPIService;