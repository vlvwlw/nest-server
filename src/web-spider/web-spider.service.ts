import { Injectable, } from '@nestjs/common';
import { CreateWebSpiderDto } from './dto/create-web-spider.dto';
import { UpdateWebSpiderDto } from './dto/update-web-spider.dto';
import cheerio from 'cheerio'
import { chromium } from 'playwright'

interface Response {
	status:number,
	message:string,
}
interface GetTime extends Response{
	data:{
		title:string,
		current:number,
		total:number,
		videoNum:number,
		currentVideo:number,
	}
}

@Injectable()
export class WebSpiderService {
	async create(createWebSpiderDto: CreateWebSpiderDto):Promise<any>{
		// console.log(createWebSpiderDto)
		try {
			// const url = 'https://www.bilibili.com/video/BV1PY411e7J6?p=75&vd_source=c19575d88bd76125dcbaa2e11d96753f'
			const url = createWebSpiderDto.url
			let params = new URL(url).searchParams;

			// 提取p参数的值
			let pValue: any = params.get('p');

			const browser = await chromium.launch();
			const context = await browser.newContext();
			const page = await context.newPage();

			await page.goto(url, { waitUntil: 'networkidle' })
			await page.waitForSelector('.router-link-active');

			const content = await page.content();
			await browser.close();
			// await context.close();
			const $ = cheerio.load(content);

			const listBox = $('.router-link-active .duration').map((i, el) => $(el).text()).get();
			const title = $('#viewbox_report > h1')
			const videoNum = $('.head-left > .cur-page')
			let str = videoNum.text().slice(1, -1)
			let [currentVideo, totalVideo] = str.split('/')
			// console.log(currentVideo, totalVideo)
			// console.log(videoNum.text())

			let sum = 0;
			for (let i = 0; i < pValue -1; i++) {
				sum += formatTime(listBox[i])
			}
			let totalTime = 0;
			for(let i = 0; i< listBox.length; i ++){
				totalTime += formatTime(listBox[i])
			}
			// console.log('已观看', sum / 60, '个小时')

			// return sum / 60;
			return {
				status:200,
				message:'查询成功',
				data:{
					title: title.text(),
					current: sum / 60,
					total: totalTime / 60,
					videoNum: +totalVideo,
					currentVideo: +currentVideo,
				}
				// current: formatHoursToHMS(sum / 60),
				// total:''
			}
		} catch (error) {
			return {
				status:400,
				message:error.message
			}
		}
		function formatTime(time: any) {
			let timeType = time.split(':')
			if (timeType.length < 3) {
				time = "0:" + time
			}
			let [hour, min, sec] = time.split(':')
			hour = parseInt(hour)
			min = parseInt(min)
			sec = parseInt(sec)
			let totalMin = hour * 60 + min + sec / 60
			return totalMin
		}
		function formatHoursToHMS(hours:any) {
			// 获取小时数的整数部分
			const hoursInt = Math.floor(hours);
			// 计算剩余的分钟数（小时的小数部分 * 60）
			const minutes = Math.floor((hours - hoursInt) * 60);
			// 计算剩余的秒数（分钟的小数部分 * 60）
			const seconds = Math.round(((hours - hoursInt) * 60 - minutes) * 60);
			// 格式化输出为“时：分：秒”
			return `${hoursInt}小时${minutes.toString().padStart(2, '0')}分钟${seconds.toString().padStart(2, '0')}秒`;
		}


	}

	findAll() {
		return `This action returns all webSpider`;
	}

	findOne(id: number) {
		return `This action returns a #${id} webSpider`;
	}

	update(id: number, updateWebSpiderDto: UpdateWebSpiderDto) {
		return `This action updates a #${id} webSpider`;
	}

	remove(id: number) {
		return `This action removes a #${id} webSpider`;
	}
}
