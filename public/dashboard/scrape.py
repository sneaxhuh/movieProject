import requests
from bs4 import BeautifulSoup
import json
from concurrent.futures import ThreadPoolExecutor
import json
import uuid

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

movie_data_list = []

def get_movie_data(source_url):
    try:
        source = requests.get(source_url, headers=headers)
        source.raise_for_status()

        mainPage = BeautifulSoup(source.content, 'html.parser')

        name = mainPage.find('h1', class_="css-1hbd8x5 en5uzng3").text
        year = mainPage.find('a', class_='css-4ma814 e1r3wknn10').text
        genre = mainPage.find('a', class_='css-4ma814 e1r3wknn10').text
        imdbRating = mainPage.find('span', class_='css-8om8qx e3sx6uc13').text
        poster = mainPage.find('img', class_='css-18pmxw3 edbh37f1')['src']
        rating = mainPage.find('span', title='Maturity rating').text
        plot = mainPage.find('div', class_='css-49lcwn e1qij4j11').text
        availability = mainPage.find('span', class_='css-d3x4sy ehczivz8').text
        bg = mainPage.find('img',class_='css-18pmxw3 edbh37f1')['src']
        runTime = mainPage.select_one('.en5uzng1 .css-1szmslw:last-child').get_text()
        reelgoodscore = mainPage.find('span',class_='css-8om8qx e3sx6uc17').text
        year = mainPage.select_one('.en5uzng1 .css-1szmslw:nth-last-child(2)').text
        trailerlink = mainPage.find('div',class_='css-p7va40 en5uzng7').find('a').get('href')

        movieId = str(uuid.uuid4())
        movie_data = {
            'movieId': movieId,
            'name': name,
            'genre': genre,
            'imdbRating': imdbRating,
            'poster': poster,
            'rating': rating,
            'runTime': runTime,
            'plot': plot,
            'availability': availability,
            'bg': bg,
            'reelgoodscore' :reelgoodscore,
            'trailerlink': trailerlink
        }

        return movie_data

    except Exception as e:
        print(e)
        return None

source_list = [
    'https://reelgood.com/movie/spaceman-2023',
    'https://reelgood.com/movie/its-a-wonderful-life-1946',
    'https://reelgood.com/movie/home-alone-2-lost-in-new-york-1992',
    'https://reelgood.com/movie/leave-the-world-behind-2023',
    'https://reelgood.com/movie/the-hunger-games-the-ballad-of-songbirds-and-snakes-2023',
    'https://reelgood.com/movie/babylon-2022',
    'https://reelgood.com/movie/maestro-2',
    'https://reelgood.com/movie/silent-night-2023',
    'https://reelgood.com/movie/love-actually-2003',
    'https://reelgood.com/movie/a-christmas-carol-2009',
    'https://reelgood.com/movie/gran-turismo-2023',
    'https://reelgood.com/movie/violent-night-2022',
    'https://reelgood.com/movie/percy-jackson-the-olympians-the-lightning-thief-2010',
    'https://reelgood.com/movie/godzilla-king-of-monsters-2019',
    'https://reelgood.com/movie/the-killer',
    'https://reelgood.com/movie/the-family-plan-2023',
    'https://reelgood.com/movie/spiderman-across-the-spiderverse-part-one-2022',
    'https://reelgood.com/movie/top-gun-maverick-2020',
    'https://reelgood.com/movie/guardians-of-the-galaxy-vol-3-2023',
    'https://reelgood.com/movie/polite-society-2023',
    'https://reelgood.com/movie/scrooged-1988',
    'https://reelgood.com/movie/sound-of-freedom-2022',
    'https://reelgood.com/movie/the-muppet-christmas-carol-1992',
    'https://reelgood.com/movie/miracle-on-34th-street-1947',
    'https://reelgood.com/movie/interstellar-2014',
    'https://reelgood.com/movie/last-christmas-2019',
    'https://reelgood.com/movie/the-man-who-invented-christmas-2017',
    'https://reelgood.com/movie/diary-of-a-wimpy-kid-christmas-cabin-fever-2023',
    'https://reelgood.com/movie/chicken-run-dawn-of-the-nugget-2023',
    'https://reelgood.com/movie/the-naughty-nine-2023',
    'https://reelgood.com/movie/how-to-train-your-dragon-2010',
    'https://reelgood.com/movie/the-wonderful-story-of-henry-sugar-2023',
    'https://reelgood.com/movie/bullet-train-2022',
    'https://reelgood.com/movie/all-quiet-on-the-western-front-2018',
    'https://reelgood.com/movie/diary-of-a-wimpy-kid-christmas-cabin-fever-2023',
    'https://reelgood.com/movie/divergent-2014',
    'https://reelgood.com/movie/jaws-1975',
    'https://reelgood.com/movie/saltburn-2023',
    'https://reelgood.com/movie/elf-2003',
    'https://reelgood.com/movie/white-christmas-1954',
    'https://reelgood.com/movie/no-hard-feelings-2023',
    'https://reelgood.com/movie/the-princess-bride-1987',
    'https://reelgood.com/movie/feast-of-the-seven-fishes-2019',
    'https://reelgood.com/movie/the-taming-of-the-shrewd-2-2023',
    'https://reelgood.com/movie/christmas-of-yes-2023',
    'https://reelgood.com/movie/meet-me-under-the-mistletoe-2023',
    'https://reelgood.com/movie/the-jinglebell-jubilee',
    'https://reelgood.com/movie/wedding-games-2023',
    'https://reelgood.com/movie/alltime-high-2023',
    'https://reelgood.com/movie/reminiscence-2021',
    'https://reelgood.com/movie/phantom-killer-1942',
    'https://reelgood.com/movie/to-catch-a-thief-1955',
    'https://reelgood.com/movie/a-cinderella-christmas-2016',
    'https://reelgood.com/movie/the-lovebirds-2020',
    'https://reelgood.com/movie/infinity-pool-2023',
    'https://reelgood.com/movie/no-one-will-save-you-2023',
    'https://reelgood.com/movie/x-2022',
    'https://reelgood.com/movie/meg-2-the-trench-2023',
    'https://reelgood.com/movie/alien-1979',
    'https://reelgood.com/movie/nope-2022',
    'https://reelgood.com/movie/knock-at-the-cabin-2023',
    'https://reelgood.com/movie/the-menu-2022',
    'https://reelgood.com/movie/locked-in-2023-1',
    'https://reelgood.com/movie/cobweb-2023',
    'https://reelgood.com/movie/fresh-2022',
    'https://reelgood.com/movie/the-rope-curse-3-2023',
    'https://reelgood.com/movie/the-zeme-2021',
    'https://reelgood.com/movie/bone-tomahawk-2015',
    'https://reelgood.com/movie/barbarian-2022',
    'https://reelgood.com/movie/m3gan-2023',
    'https://reelgood.com/movie/smile-2022',
    'https://reelgood.com/movie/28-weeks-later-2007'

]


with ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(get_movie_data, source_list))


print("[")
for i, movie_data in enumerate(filter(None, results)):
    print(json.dumps(movie_data, indent=2), end="")
    if i < len(results) - 2:
        print(",")
print("]")
