/*
 Navicat Premium Data Transfer

 Source Server         : localhost-MySQL8
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : cq_history

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 16/07/2022 15:50:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for exam_arrangement
-- ----------------------------
DROP TABLE IF EXISTS `exam_arrangement`;
CREATE TABLE `exam_arrangement`  (
  `exam_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `exam_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `exam_setting` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `exam_begin` datetime NULL DEFAULT NULL,
  `exam_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_arrangement
-- ----------------------------
INSERT INTO `exam_arrangement` VALUES ('A1', 'fsfs814TY', 'Y', '2022-07-29 15:47:08', '120');
INSERT INTO `exam_arrangement` VALUES ('B2', 'wrff7898Z', 'N', NULL, '20');

-- ----------------------------
-- Table structure for people
-- ----------------------------
DROP TABLE IF EXISTS `people`;
CREATE TABLE `people`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `weight` double NULL DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of people
-- ----------------------------
INSERT INTO `people` VALUES ('专诸', 1);
INSERT INTO `people` VALUES ('丕豹', 2);
INSERT INTO `people` VALUES ('丕郑父', 3);
INSERT INTO `people` VALUES ('严仲子', 4);
INSERT INTO `people` VALUES ('中行偃', 6);
INSERT INTO `people` VALUES ('乐毅', 2);
INSERT INTO `people` VALUES ('乐羊', 1);
INSERT INTO `people` VALUES ('乐间', 2);
INSERT INTO `people` VALUES ('介子推', 1);
INSERT INTO `people` VALUES ('令尹子上', 2);
INSERT INTO `people` VALUES ('令尹子元', 2);
INSERT INTO `people` VALUES ('令尹子文', 2);
INSERT INTO `people` VALUES ('令尹子玉', 2);
INSERT INTO `people` VALUES ('伍举', 3);
INSERT INTO `people` VALUES ('伍参', 4);
INSERT INTO `people` VALUES ('伍子胥', 8);
INSERT INTO `people` VALUES ('伍尚', 2);
INSERT INTO `people` VALUES ('伯嚭', 2);
INSERT INTO `people` VALUES ('佘祭', 5);
INSERT INTO `people` VALUES ('侠累', 4);
INSERT INTO `people` VALUES ('侯嬴', 1);
INSERT INTO `people` VALUES ('信陵君', 5);
INSERT INTO `people` VALUES ('偪姞', 1);
INSERT INTO `people` VALUES ('僚', 3);
INSERT INTO `people` VALUES ('允常', 2);
INSERT INTO `people` VALUES ('先且居', 4);
INSERT INTO `people` VALUES ('先轸', 3);
INSERT INTO `people` VALUES ('公叔痤', 3);
INSERT INTO `people` VALUES ('公子偃', 1);
INSERT INTO `people` VALUES ('公子子鱼', 1);
INSERT INTO `people` VALUES ('公子成', 2);
INSERT INTO `people` VALUES ('公子无亏', 2);
INSERT INTO `people` VALUES ('公子絷', 1);
INSERT INTO `people` VALUES ('公子纠', 1);
INSERT INTO `people` VALUES ('公孙喜', 2);
INSERT INTO `people` VALUES ('公孙杵臼', 1);
INSERT INTO `people` VALUES ('公孙枝', 1);
INSERT INTO `people` VALUES ('公孙纠', 1);
INSERT INTO `people` VALUES ('公孙衍', 2);
INSERT INTO `people` VALUES ('养由基', 3);
INSERT INTO `people` VALUES ('冯亭', 2);
INSERT INTO `people` VALUES ('勾践', 4);
INSERT INTO `people` VALUES ('匡章', 4);
INSERT INTO `people` VALUES ('华元', 4);
INSERT INTO `people` VALUES ('华阳君', 1);
INSERT INTO `people` VALUES ('华阳夫人', 2);
INSERT INTO `people` VALUES ('卓子', 3);
INSERT INTO `people` VALUES ('南宫长万', 1);
INSERT INTO `people` VALUES ('卫公子寿', 1);
INSERT INTO `people` VALUES ('卫公子开方', 2);
INSERT INTO `people` VALUES ('卫宣公', 4);
INSERT INTO `people` VALUES ('卫惠公', 3);
INSERT INTO `people` VALUES ('卫懿公', 1);
INSERT INTO `people` VALUES ('卫文公', 1);
INSERT INTO `people` VALUES ('叔牙', 1);
INSERT INTO `people` VALUES ('叔詹', 1);
INSERT INTO `people` VALUES ('叔隗', 3);
INSERT INTO `people` VALUES ('司马错', 1);
INSERT INTO `people` VALUES ('吕不韦', 1);
INSERT INTO `people` VALUES ('吕甥', 2);
INSERT INTO `people` VALUES ('吴娃', 2);
INSERT INTO `people` VALUES ('吴泰伯', 1);
INSERT INTO `people` VALUES ('吴起', 4);
INSERT INTO `people` VALUES ('周定王', 1);
INSERT INTO `people` VALUES ('周文王', 1);
INSERT INTO `people` VALUES ('哀姜', 1);
INSERT INTO `people` VALUES ('商鞅', 3);
INSERT INTO `people` VALUES ('囊瓦', 2);
INSERT INTO `people` VALUES ('士会', 6);
INSERT INTO `people` VALUES ('夏姬', 1);
INSERT INTO `people` VALUES ('夫差', 2);
INSERT INTO `people` VALUES ('夷昧', 5);
INSERT INTO `people` VALUES ('奉阳君', 4);
INSERT INTO `people` VALUES ('奚齐', 5);
INSERT INTO `people` VALUES ('嬴政', 1);
INSERT INTO `people` VALUES ('嬴柱', 1);
INSERT INTO `people` VALUES ('嬴楚', 1);
INSERT INTO `people` VALUES ('嬴疾', 3);
INSERT INTO `people` VALUES ('子之', 2);
INSERT INTO `people` VALUES ('子反', 1);
INSERT INTO `people` VALUES ('子贡', 1);
INSERT INTO `people` VALUES ('子路', 1);
INSERT INTO `people` VALUES ('孔子', 3);
INSERT INTO `people` VALUES ('孙叔敖', 1);
INSERT INTO `people` VALUES ('孙武', 2);
INSERT INTO `people` VALUES ('孙膑', 3);
INSERT INTO `people` VALUES ('孟子', 2);
INSERT INTO `people` VALUES ('孟尝君', 6);
INSERT INTO `people` VALUES ('孟明视', 2);
INSERT INTO `people` VALUES ('季历', 2);
INSERT INTO `people` VALUES ('季友', 2);
INSERT INTO `people` VALUES ('季平子', 4);
INSERT INTO `people` VALUES ('季康子', 1);
INSERT INTO `people` VALUES ('季恒子', 3);
INSERT INTO `people` VALUES ('季文子', 4);
INSERT INTO `people` VALUES ('季武子', 3);
INSERT INTO `people` VALUES ('季礼', 1);
INSERT INTO `people` VALUES ('季隗', 2);
INSERT INTO `people` VALUES ('宁戚', 1);
INSERT INTO `people` VALUES ('安平君', 1);
INSERT INTO `people` VALUES ('安阳君', 3);
INSERT INTO `people` VALUES ('宋休公', 4);
INSERT INTO `people` VALUES ('宋元公', 5);
INSERT INTO `people` VALUES ('宋共公', 1);
INSERT INTO `people` VALUES ('宋剔成公', 2);
INSERT INTO `people` VALUES ('宋剔成君', 4);
INSERT INTO `people` VALUES ('宋平公', 5);
INSERT INTO `people` VALUES ('宋废公', 10);
INSERT INTO `people` VALUES ('宋康王', 4);
INSERT INTO `people` VALUES ('宋恒公', 4);
INSERT INTO `people` VALUES ('宋悼公', 3);
INSERT INTO `people` VALUES ('宋成公', 6);
INSERT INTO `people` VALUES ('宋文公', 1);
INSERT INTO `people` VALUES ('宋文共', 2);
INSERT INTO `people` VALUES ('宋昭公', 11);
INSERT INTO `people` VALUES ('宋景公', 5);
INSERT INTO `people` VALUES ('宋玉', 2);
INSERT INTO `people` VALUES ('宋襄公', 6);
INSERT INTO `people` VALUES ('宋辟公', 4);
INSERT INTO `people` VALUES ('宋闵公', 4);
INSERT INTO `people` VALUES ('宣太后', 7);
INSERT INTO `people` VALUES ('宣姜', 5);
INSERT INTO `people` VALUES ('寿梦', 6);
INSERT INTO `people` VALUES ('屈丐', 1);
INSERT INTO `people` VALUES ('屈完', 1);
INSERT INTO `people` VALUES ('屈瑕', 1);
INSERT INTO `people` VALUES ('崔夫人', 2);
INSERT INTO `people` VALUES ('崔杼', 3);
INSERT INTO `people` VALUES ('巫臣', 3);
INSERT INTO `people` VALUES ('平原君', 4);
INSERT INTO `people` VALUES ('平阳君', 3);
INSERT INTO `people` VALUES ('幸姬', 1);
INSERT INTO `people` VALUES ('庄子', 1);
INSERT INTO `people` VALUES ('庆封', 1);
INSERT INTO `people` VALUES ('庆忌', 1);
INSERT INTO `people` VALUES ('庆父', 2);
INSERT INTO `people` VALUES ('庆郑', 1);
INSERT INTO `people` VALUES ('庞涓', 2);
INSERT INTO `people` VALUES ('廉颇', 6);
INSERT INTO `people` VALUES ('建信君', 2);
INSERT INTO `people` VALUES ('张仪', 4);
INSERT INTO `people` VALUES ('张孟谈', 1);
INSERT INTO `people` VALUES ('张禄', 1);
INSERT INTO `people` VALUES ('张若', 1);
INSERT INTO `people` VALUES ('张魁', 1);
INSERT INTO `people` VALUES ('怀赢', 2);
INSERT INTO `people` VALUES ('急子', 2);
INSERT INTO `people` VALUES ('息侯', 1);
INSERT INTO `people` VALUES ('惠施', 3);
INSERT INTO `people` VALUES ('成嘉', 2);
INSERT INTO `people` VALUES ('文信侯', 6);
INSERT INTO `people` VALUES ('文姜', 4);
INSERT INTO `people` VALUES ('文种', 1);
INSERT INTO `people` VALUES ('文赢', 2);
INSERT INTO `people` VALUES ('斐豹', 1);
INSERT INTO `people` VALUES ('斗伯比', 2);
INSERT INTO `people` VALUES ('斗成然', 2);
INSERT INTO `people` VALUES ('斗祁', 3);
INSERT INTO `people` VALUES ('斗般', 2);
INSERT INTO `people` VALUES ('旬息', 2);
INSERT INTO `people` VALUES ('易牙', 2);
INSERT INTO `people` VALUES ('春申君', 4);
INSERT INTO `people` VALUES ('昭阳', 1);
INSERT INTO `people` VALUES ('晋出公', 4);
INSERT INTO `people` VALUES ('晋历公', 8);
INSERT INTO `people` VALUES ('晋孝公', 4);
INSERT INTO `people` VALUES ('晋定公', 5);
INSERT INTO `people` VALUES ('晋平公', 7);
INSERT INTO `people` VALUES ('晋幽公', 4);
INSERT INTO `people` VALUES ('晋怀公', 1);
INSERT INTO `people` VALUES ('晋悼公', 12);
INSERT INTO `people` VALUES ('晋惠公', 10);
INSERT INTO `people` VALUES ('晋成公', 5);
INSERT INTO `people` VALUES ('晋文公', 16);
INSERT INTO `people` VALUES ('晋昭公', 5);
INSERT INTO `people` VALUES ('晋景公', 10);
INSERT INTO `people` VALUES ('晋灵公', 6);
INSERT INTO `people` VALUES ('晋烈公', 4);
INSERT INTO `people` VALUES ('晋献公', 10);
INSERT INTO `people` VALUES ('晋衰公', 4);
INSERT INTO `people` VALUES ('晋襄公', 23);
INSERT INTO `people` VALUES ('晋鄙', 2);
INSERT INTO `people` VALUES ('晋顷公', 4);
INSERT INTO `people` VALUES ('晏婴', 6);
INSERT INTO `people` VALUES ('景翠', 1);
INSERT INTO `people` VALUES ('智伯', 3);
INSERT INTO `people` VALUES ('智朔', 2);
INSERT INTO `people` VALUES ('智申', 2);
INSERT INTO `people` VALUES ('智盈', 2);
INSERT INTO `people` VALUES ('智罃', 8);
INSERT INTO `people` VALUES ('智跞', 6);
INSERT INTO `people` VALUES ('暴鸢', 4);
INSERT INTO `people` VALUES ('曹刿', 2);
INSERT INTO `people` VALUES ('曾参', 1);
INSERT INTO `people` VALUES ('曾申', 2);
INSERT INTO `people` VALUES ('朱亥', 1);
INSERT INTO `people` VALUES ('李冰', 1);
INSERT INTO `people` VALUES ('李悝', 1);
INSERT INTO `people` VALUES ('李斯', 1);
INSERT INTO `people` VALUES ('栗腹', 2);
INSERT INTO `people` VALUES ('栾书', 7);
INSERT INTO `people` VALUES ('栾枝', 1);
INSERT INTO `people` VALUES ('栾盈', 3);
INSERT INTO `people` VALUES ('栾盾', 4);
INSERT INTO `people` VALUES ('栾黡', 2);
INSERT INTO `people` VALUES ('桃花夫人', 2);
INSERT INTO `people` VALUES ('楚共王', 5);
INSERT INTO `people` VALUES ('楚哀王', 4);
INSERT INTO `people` VALUES ('楚声王', 4);
INSERT INTO `people` VALUES ('楚威王', 4);
INSERT INTO `people` VALUES ('楚宣王', 4);
INSERT INTO `people` VALUES ('楚平王', 7);
INSERT INTO `people` VALUES ('楚幽王', 4);
INSERT INTO `people` VALUES ('楚庄王', 12);
INSERT INTO `people` VALUES ('楚康王', 5);
INSERT INTO `people` VALUES ('楚怀王', 6);
INSERT INTO `people` VALUES ('楚悼王', 6);
INSERT INTO `people` VALUES ('楚惠王', 4);
INSERT INTO `people` VALUES ('楚愍王', 4);
INSERT INTO `people` VALUES ('楚成王', 14);
INSERT INTO `people` VALUES ('楚文王', 5);
INSERT INTO `people` VALUES ('楚昭王', 9);
INSERT INTO `people` VALUES ('楚杜敖', 4);
INSERT INTO `people` VALUES ('楚武王', 6);
INSERT INTO `people` VALUES ('楚灵王', 5);
INSERT INTO `people` VALUES ('楚王负刍', 2);
INSERT INTO `people` VALUES ('楚穆王', 4);
INSERT INTO `people` VALUES ('楚简王', 4);
INSERT INTO `people` VALUES ('楚考烈王', 6);
INSERT INTO `people` VALUES ('楚肃王', 4);
INSERT INTO `people` VALUES ('楚若敖', 2);
INSERT INTO `people` VALUES ('楚顷襄王', 7);
INSERT INTO `people` VALUES ('楼缓', 2);
INSERT INTO `people` VALUES ('毕万', 4);
INSERT INTO `people` VALUES ('毕阳', 2);
INSERT INTO `people` VALUES ('毛遂', 1);
INSERT INTO `people` VALUES ('沈尹戌', 2);
INSERT INTO `people` VALUES ('泾阳君', 1);
INSERT INTO `people` VALUES ('烛之武', 1);
INSERT INTO `people` VALUES ('燕太子平', 1);
INSERT INTO `people` VALUES ('燕昭王', 7);
INSERT INTO `people` VALUES ('燕王哙', 6);
INSERT INTO `people` VALUES ('燕王喜', 4);
INSERT INTO `people` VALUES ('狐偃', 2);
INSERT INTO `people` VALUES ('狐射姑', 3);
INSERT INTO `people` VALUES ('王孙满', 1);
INSERT INTO `people` VALUES ('王稽', 2);
INSERT INTO `people` VALUES ('王错', 1);
INSERT INTO `people` VALUES ('王陵', 2);
INSERT INTO `people` VALUES ('王龁', 2);
INSERT INTO `people` VALUES ('甘茂', 3);
INSERT INTO `people` VALUES ('甘龙', 1);
INSERT INTO `people` VALUES ('田不礼', 1);
INSERT INTO `people` VALUES ('田剡', 1);
INSERT INTO `people` VALUES ('田和', 1);
INSERT INTO `people` VALUES ('田婴', 2);
INSERT INTO `people` VALUES ('田忌', 2);
INSERT INTO `people` VALUES ('田昐', 2);
INSERT INTO `people` VALUES ('申不害', 2);
INSERT INTO `people` VALUES ('申包胥', 3);
INSERT INTO `people` VALUES ('申生', 1);
INSERT INTO `people` VALUES ('白乙丙', 3);
INSERT INTO `people` VALUES ('白圭', 2);
INSERT INTO `people` VALUES ('白起', 1);
INSERT INTO `people` VALUES ('百里奚', 3);
INSERT INTO `people` VALUES ('督戎', 1);
INSERT INTO `people` VALUES ('秦共公', 4);
INSERT INTO `people` VALUES ('秦出公', 4);
INSERT INTO `people` VALUES ('秦厉共公', 4);
INSERT INTO `people` VALUES ('秦哀公', 6);
INSERT INTO `people` VALUES ('秦夷公', 4);
INSERT INTO `people` VALUES ('秦始皇', 5);
INSERT INTO `people` VALUES ('秦始皇帝', 4);
INSERT INTO `people` VALUES ('秦孝公', 11);
INSERT INTO `people` VALUES ('秦孝文王', 12);
INSERT INTO `people` VALUES ('秦庄襄王', 15);
INSERT INTO `people` VALUES ('秦康公', 5);
INSERT INTO `people` VALUES ('秦德公', 2);
INSERT INTO `people` VALUES ('秦怀公', 4);
INSERT INTO `people` VALUES ('秦悼公', 4);
INSERT INTO `people` VALUES ('秦惠公', 8);
INSERT INTO `people` VALUES ('秦惠文王', 21);
INSERT INTO `people` VALUES ('秦昭襄王', 26);
INSERT INTO `people` VALUES ('秦景公', 6);
INSERT INTO `people` VALUES ('秦桓公', 4);
INSERT INTO `people` VALUES ('秦武公', 2);
INSERT INTO `people` VALUES ('秦武王', 12);
INSERT INTO `people` VALUES ('秦灵公', 4);
INSERT INTO `people` VALUES ('秦献公', 4);
INSERT INTO `people` VALUES ('秦穆公', 15);
INSERT INTO `people` VALUES ('秦简公', 4);
INSERT INTO `people` VALUES ('秦襄公', 1);
INSERT INTO `people` VALUES ('秦躁公', 4);
INSERT INTO `people` VALUES ('程婴', 1);
INSERT INTO `people` VALUES ('穆姬', 4);
INSERT INTO `people` VALUES ('竖刁', 2);
INSERT INTO `people` VALUES ('管仲', 3);
INSERT INTO `people` VALUES ('翟璜', 1);
INSERT INTO `people` VALUES ('聂政', 3);
INSERT INTO `people` VALUES ('肥义', 4);
INSERT INTO `people` VALUES ('胥甲', 3);
INSERT INTO `people` VALUES ('胥臣', 1);
INSERT INTO `people` VALUES ('苏秦', 3);
INSERT INTO `people` VALUES ('范宣子', 7);
INSERT INTO `people` VALUES ('范文子', 2);
INSERT INTO `people` VALUES ('范睢', 6);
INSERT INTO `people` VALUES ('范蠡', 1);
INSERT INTO `people` VALUES ('范鞅', 4);
INSERT INTO `people` VALUES ('荀子', 2);
INSERT INTO `people` VALUES ('荀林父', 8);
INSERT INTO `people` VALUES ('荀首', 2);
INSERT INTO `people` VALUES ('萧叔大心', 3);
INSERT INTO `people` VALUES ('蒍贾', 1);
INSERT INTO `people` VALUES ('蒙骜', 8);
INSERT INTO `people` VALUES ('蔡姬', 2);
INSERT INTO `people` VALUES ('蔺相如', 2);
INSERT INTO `people` VALUES ('虞卿', 2);
INSERT INTO `people` VALUES ('西乞术', 3);
INSERT INTO `people` VALUES ('西门豹', 1);
INSERT INTO `people` VALUES ('触子', 2);
INSERT INTO `people` VALUES ('诸樊', 5);
INSERT INTO `people` VALUES ('豫让', 1);
INSERT INTO `people` VALUES ('费无极', 1);
INSERT INTO `people` VALUES ('赢虔', 2);
INSERT INTO `people` VALUES ('赵同', 2);
INSERT INTO `people` VALUES ('赵奢', 1);
INSERT INTO `people` VALUES ('赵姬', 2);
INSERT INTO `people` VALUES ('赵婴齐', 3);
INSERT INTO `people` VALUES ('赵孝成王', 15);
INSERT INTO `people` VALUES ('赵庄姬', 3);
INSERT INTO `people` VALUES ('赵悼襄王', 6);
INSERT INTO `people` VALUES ('赵惠文王', 18);
INSERT INTO `people` VALUES ('赵成', 2);
INSERT INTO `people` VALUES ('赵成侯', 4);
INSERT INTO `people` VALUES ('赵括', 5);
INSERT INTO `people` VALUES ('赵敬侯', 4);
INSERT INTO `people` VALUES ('赵无恤', 1);
INSERT INTO `people` VALUES ('赵朔', 9);
INSERT INTO `people` VALUES ('赵武', 8);
INSERT INTO `people` VALUES ('赵武侯', 4);
INSERT INTO `people` VALUES ('赵武灵王', 15);
INSERT INTO `people` VALUES ('赵烈侯', 2);
INSERT INTO `people` VALUES ('赵王迁', 2);
INSERT INTO `people` VALUES ('赵盾', 14);
INSERT INTO `people` VALUES ('赵穿', 1);
INSERT INTO `people` VALUES ('赵简子', 7);
INSERT INTO `people` VALUES ('赵肃侯', 4);
INSERT INTO `people` VALUES ('赵胜', 1);
INSERT INTO `people` VALUES ('赵衰', 3);
INSERT INTO `people` VALUES ('赵襄子', 2);
INSERT INTO `people` VALUES ('赵豹', 1);
INSERT INTO `people` VALUES ('赵郝', 1);
INSERT INTO `people` VALUES ('蹇叔', 4);
INSERT INTO `people` VALUES ('达子', 2);
INSERT INTO `people` VALUES ('逢丑父', 1);
INSERT INTO `people` VALUES ('逼姞', 1);
INSERT INTO `people` VALUES ('邹忌', 2);
INSERT INTO `people` VALUES ('邹衍', 1);
INSERT INTO `people` VALUES ('郑厉公', 2);
INSERT INTO `people` VALUES ('郑安平', 2);
INSERT INTO `people` VALUES ('郑庄公', 2);
INSERT INTO `people` VALUES ('郑文公', 2);
INSERT INTO `people` VALUES ('郤克', 7);
INSERT INTO `people` VALUES ('郤宛', 1);
INSERT INTO `people` VALUES ('郤犨', 2);
INSERT INTO `people` VALUES ('郤缺', 8);
INSERT INTO `people` VALUES ('郤至', 2);
INSERT INTO `people` VALUES ('郤芮', 3);
INSERT INTO `people` VALUES ('郤锜', 2);
INSERT INTO `people` VALUES ('里克', 3);
INSERT INTO `people` VALUES ('钟无艳', 1);
INSERT INTO `people` VALUES ('阖闾', 6);
INSERT INTO `people` VALUES ('阳处父', 3);
INSERT INTO `people` VALUES ('阳虎', 2);
INSERT INTO `people` VALUES ('陈珍', 2);
INSERT INTO `people` VALUES ('隰朋', 1);
INSERT INTO `people` VALUES ('韩厘王', 4);
INSERT INTO `people` VALUES ('韩厥', 7);
INSERT INTO `people` VALUES ('韩哀侯', 6);
INSERT INTO `people` VALUES ('韩宣惠王', 4);
INSERT INTO `people` VALUES ('韩徐为', 1);
INSERT INTO `people` VALUES ('韩恒惠王', 6);
INSERT INTO `people` VALUES ('韩懿候', 4);
INSERT INTO `people` VALUES ('韩文侯', 4);
INSERT INTO `people` VALUES ('韩昭侯', 6);
INSERT INTO `people` VALUES ('韩景侯', 2);
INSERT INTO `people` VALUES ('韩氏夫人', 2);
INSERT INTO `people` VALUES ('韩烈侯', 7);
INSERT INTO `people` VALUES ('韩王安', 2);
INSERT INTO `people` VALUES ('韩珉', 3);
INSERT INTO `people` VALUES ('韩简', 1);
INSERT INTO `people` VALUES ('韩襄王', 6);
INSERT INTO `people` VALUES ('韩起', 4);
INSERT INTO `people` VALUES ('韩釐王', 2);
INSERT INTO `people` VALUES ('韩非', 1);
INSERT INTO `people` VALUES ('须贾', 2);
INSERT INTO `people` VALUES ('颜回', 1);
INSERT INTO `people` VALUES ('马服君', 6);
INSERT INTO `people` VALUES ('骈臾', 2);
INSERT INTO `people` VALUES ('骊姬', 3);
INSERT INTO `people` VALUES ('高陵君', 1);
INSERT INTO `people` VALUES ('鬼谷子', 3);
INSERT INTO `people` VALUES ('魏丑夫', 1);
INSERT INTO `people` VALUES ('魏冉', 3);
INSERT INTO `people` VALUES ('魏安僖王', 7);
INSERT INTO `people` VALUES ('魏恒子', 2);
INSERT INTO `people` VALUES ('魏惠王', 11);
INSERT INTO `people` VALUES ('魏文侯', 7);
INSERT INTO `people` VALUES ('魏无忌', 1);
INSERT INTO `people` VALUES ('魏昭王', 6);
INSERT INTO `people` VALUES ('魏景愍王', 4);
INSERT INTO `people` VALUES ('魏武侯', 5);
INSERT INTO `people` VALUES ('魏犨', 3);
INSERT INTO `people` VALUES ('魏献子', 3);
INSERT INTO `people` VALUES ('魏王', 3);
INSERT INTO `people` VALUES ('魏王假', 2);
INSERT INTO `people` VALUES ('魏章', 1);
INSERT INTO `people` VALUES ('魏绛', 4);
INSERT INTO `people` VALUES ('魏舒', 8);
INSERT INTO `people` VALUES ('魏襄王', 5);
INSERT INTO `people` VALUES ('魏齐', 2);
INSERT INTO `people` VALUES ('鲁僖公', 5);
INSERT INTO `people` VALUES ('鲁元公', 4);
INSERT INTO `people` VALUES ('鲁共公', 4);
INSERT INTO `people` VALUES ('鲁哀公', 4);
INSERT INTO `people` VALUES ('鲁定公', 4);
INSERT INTO `people` VALUES ('鲁宣公', 5);
INSERT INTO `people` VALUES ('鲁平公', 4);
INSERT INTO `people` VALUES ('鲁庄公', 10);
INSERT INTO `people` VALUES ('鲁康公', 4);
INSERT INTO `people` VALUES ('鲁恒公', 9);
INSERT INTO `people` VALUES ('鲁悼公', 4);
INSERT INTO `people` VALUES ('鲁成公', 4);
INSERT INTO `people` VALUES ('鲁文公', 8);
INSERT INTO `people` VALUES ('鲁昭公', 4);
INSERT INTO `people` VALUES ('鲁景公', 4);
INSERT INTO `people` VALUES ('鲁穆公', 5);
INSERT INTO `people` VALUES ('鲁襄公', 4);
INSERT INTO `people` VALUES ('鲁闵公', 6);
INSERT INTO `people` VALUES ('鲁隐公', 2);
INSERT INTO `people` VALUES ('鲁顷公', 2);
INSERT INTO `people` VALUES ('鲍叔牙', 2);
INSERT INTO `people` VALUES ('鹿毛寿', 1);
INSERT INTO `people` VALUES ('黄歇', 1);
INSERT INTO `people` VALUES ('齐公子无亏', 1);
INSERT INTO `people` VALUES ('齐公子雍', 1);
INSERT INTO `people` VALUES ('齐太公', 4);
INSERT INTO `people` VALUES ('齐姜', 2);
INSERT INTO `people` VALUES ('齐威王', 12);
INSERT INTO `people` VALUES ('齐孝公', 3);
INSERT INTO `people` VALUES ('齐宣公', 2);
INSERT INTO `people` VALUES ('齐宣王', 16);
INSERT INTO `people` VALUES ('齐平公', 2);
INSERT INTO `people` VALUES ('齐庄公', 8);
INSERT INTO `people` VALUES ('齐废公', 5);
INSERT INTO `people` VALUES ('齐康公', 2);
INSERT INTO `people` VALUES ('齐悼公', 2);
INSERT INTO `people` VALUES ('齐惠公', 1);
INSERT INTO `people` VALUES ('齐懿公', 1);
INSERT INTO `people` VALUES ('齐昭公', 2);
INSERT INTO `people` VALUES ('齐景公', 8);
INSERT INTO `people` VALUES ('齐桓公', 23);
INSERT INTO `people` VALUES ('齐泯王', 4);
INSERT INTO `people` VALUES ('齐灵公', 3);
INSERT INTO `people` VALUES ('齐王建', 2);
INSERT INTO `people` VALUES ('齐简公', 2);
INSERT INTO `people` VALUES ('齐襄公', 3);
INSERT INTO `people` VALUES ('齐襄王', 7);
INSERT INTO `people` VALUES ('齐闵王', 15);
INSERT INTO `people` VALUES ('齐顷公', 1);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `English` int NULL DEFAULT NULL,
  `Math` int NULL DEFAULT NULL,
  `Computer` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('zhangsan', 69, 86, 77);
INSERT INTO `student` VALUES ('lisi', 55, 95, 88);
INSERT INTO `student` VALUES ('scofileld', 45, 89, 100);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `auth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `addTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '111', '1VWCfsqs6GjiOj5E4cND3+v+WRc=', '1', '2022-07-14 23:23:28');
INSERT INTO `users` VALUES (5, '1111', 'Un7ECW3WH6hXkv09Ua2yQUGZ7BSLMDXJ7s41bqDwXzk=', '1', '2022-07-15 14:31:46');
INSERT INTO `users` VALUES (6, '12345', '2Vfq15lNknxsQnTttxC5eGBWT7IhFLZPGjUndF0M2j0=', '1', '2022-07-15 15:06:51');
INSERT INTO `users` VALUES (7, '123456666', '2Vfq15lNknxsQnTttxC5eGBWT7IhFLZPGjUndF0M2j0=', '1', '2022-07-16 15:08:16');

SET FOREIGN_KEY_CHECKS = 1;
