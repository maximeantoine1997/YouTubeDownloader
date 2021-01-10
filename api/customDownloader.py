from pytube import YouTube
import os

location = os.path.expanduser('~') + "\Downloads"

def check_file_name(name):
    filename = name
    path = location + f"\{filename}.mp4"

    if not os.path.exists(path):
        # file not yet in dir
        return filename

    # file in dir
    count = 1
    while os.path.exists(path):
        filename = name + f"_({count})"
        path = location + f"\{filename}.mp4"
        count += 1

    return filename
    

    

def download_video_audio(link):
    # custom location for user? 
    
    print(location)
    try:  
        yt = YouTube(link)
        yt.streams.get_by_itag(22).download(location, filename=check_file_name("video"))
    except:
        print("error when downloading...")

def download_video(link, quality):
    yt = YouTube(link)
    if quality == 1080:
        yt.streams.filter(only_video=True).filter(res="1080p").first().download(location, filename=check_file_name("video"))
    else:
        yt.streams.filter(only_video=True).filter(res="720p").first().download(location, filename=check_file_name("video"))

def download_audio(link):
    yt = YouTube(link)
    yt.streams.filter(only_audio=True).filter(abr="128kbps").first().download(location, filename=check_file_name("audio"))

def download_file(link, format, quality): # format => 1=Video+Audio 2=Video 3=Audio || quality => 720, 1080
    if format == 1 and quality == 1080:
        download_video(link, quality)
        download_audio(link)
    elif format == 1:
        download_video_audio(link)
    elif format == 2:
        download_video(link, quality)
    else:
        download_audio(link)

check_file_name("audio")