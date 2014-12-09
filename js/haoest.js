var HAOest = {
    browser: {
        userAgent: navigator.userAgent,
        webkitVersion: function () {
            var u = navigator.userAgent;
            var matchIndex = u.indexOf('AppleWebKit/');
            if (matchIndex > -1) {
                var num = u.substring(matchIndex + 12, matchIndex + 18).replace(' ', '');
                return parseFloat(num);
            }
            return '';
        }(),
        isQQBrowser: function () {
            if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
                return true;
            }
            return false;
        }(),
        versions: function () {
            var u = navigator.userAgent;
            //�ƶ��ն�������汾��Ϣ
            return {
                trident: u.indexOf('Trident') > -1, //IE�ں�
                presto: u.indexOf('Presto') > -1, //opera�ں�
                webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //�Ƿ�Ϊ�ƶ��ն�
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
                iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
                weixin: u.indexOf('MicroMessenger') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        screen: function () {
            var width = document.documentElement.clientWidth || document.body.clientWidth;
            var height = document.documentElement.clientHeight || document.body.clientHeight;
            var ratio = width / height;
            return { width: width, height: height, ratio: ratio };
        }()
    }
};
