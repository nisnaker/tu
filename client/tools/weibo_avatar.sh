# 爬取微博用户头像

# curl -I -X HEAD  http://tp2.sinaimg.cn/5745193322/180/0 -w %{size_request} -o /dev/null --silent -m 2
# curl -I -X HEAD  http://tp2.sinaimg.cn/10/180/0 --silent | grep Length | awk '{print $2}'


id=0;
defafult_size=9225;

function random ()
{
	num=$(date +%s%N);
	((id=num%9999999+5740000000));
}

i=0;
n=0;
while [[ true ]]; do
	i=$(($i+1))
	echo $i;
	# if (( $i > 10 )); then
	# 	break;
	# fi


	random;
	# id=10;
	url='http://tp2.sinaimg.cn/'$id'/180/0';
	# echo $url;

	length=`curl -I -X HEAD  "$url" --silent | grep Length | awk '{print $2}'`;
	
	# length末尾有一个隐藏字符，需要截掉，否则影响判断。`cat -v`可以看到这个字符。
	l=`echo $length | wc -L`;
	length=${length:0:$l};

	if [ $length != 9225 ]; then
		echo 'length: '$length;
		echo 'id: '$id;
		echo "$id: $length" >> weibo_avatars.txt;
		n=$(($n+1));
	fi

	if (( $n > 2000 )); then
		break;
	fi
done