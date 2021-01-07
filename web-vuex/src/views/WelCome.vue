

<template>
<div class="page1">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="欢迎!!!" name="first">欢迎!!!</el-tab-pane>
    <el-tab-pane label="商品统计" name="second">
        <!-- 商品统计 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类别" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择商品区域">
                <el-option label="类别一" value="shanghai"></el-option>
                <!-- <el-option label="类别二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="即时查询" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即查询</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 旁边的echarts -->
      <div ref="myCharts2" class="echarts2">

      </div>
    </el-tab-pane>
    <!-- 员工统计 -->
    <el-tab-pane label="员工统计" name="third">
        <!-- 员工统计 -->
        <!-- 员工 -->
        <div class="zuo">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            
            <el-form-item label="角色">
                <el-select v-model="formInline.region" placeholder="角色">
                <el-option label="一般店员" value="shanghai"></el-option>
                <el-option label="仓库管理员" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- 员工年龄 -->
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm-nian">
            <el-form-item
                label="年龄"
                prop="age"
                :rules="[
                { required: true, message: '年龄不能为空'},
                { type: 'number', message: '年龄必须为数字值'}
                ]"
            >
                <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
      <div ref="myCharts1" class="echarts1">

      </div>

      </el-tab-pane>
  </el-tabs>
  
  </div>
</template>
<script>
import * as echarts from 'echarts'
  export default {
    name:'huanyin',
    data() {
      return {
        //   名称
        formInline: {
        user: '',
        region: ''
        },
        // 年龄
         numberValidateForm: {
          age: ''
        },
        // tab
        activeName: 'first',
         ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择商品类别', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
    onSubmit() {
    console.log('submit!');
      },
      handleClick(tab, event) {
        console.log(tab, event);

        
      },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },
    mounted(){
      var myChart1 = echarts.init(this.$refs.myCharts1);
      var myChart2 = echarts.init(this.$refs.myCharts2);
      myChart1.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['男', '女']
        },
        series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '男'},
                {value: 310, name: '女'},
            ]
        }
    ]
      });
       myChart2.setOption({
            title: {
        text: '商品统计图',
        subtext: '实时数据',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['xxx', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: 'xxx'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
       })
  },
  
  };
</script>
<style lang="stylus" scoped>

</style>
<style scoped lang="less">
.demo-ruleForm-nian{
    margin-left: -60px;
    width: 316px;
    margin-top: 30px;
}
.zuo{
    margin-top: 60px;
    margin-left: 60px;
}
.demo-ruleForm{
    margin-left:80px;
    margin-top: 90px;
    width: 350px;
    height: 550px;
    
}
.page1{
  padding: 20px;
}
  .echarts1{
    margin-top: -200px;
    margin-left: 400px;
    width: 800px;
    height: 400px;
  }
    .echarts2{
    margin-top: -600px;
    margin-left: 500px;
    width: 800px;
    height: 600px;
  }
</style>