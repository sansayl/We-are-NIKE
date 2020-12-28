<template>
<div>
  <h1>发货管理页</h1>
  <div class="SG-data">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        fixed
        prop="orderNumber"
        label="订单编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="买家姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userNumber"
        label="电话号码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="trackingNumber"
        label="物流单号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="shipAddress"
        label="发货地址">
      </el-table-column>
      <el-table-column prop="isship" label="发货状态"  width="120">
       <!--  <el-select v-model="value" placeholder="请选择" :data="tableData">
          <el-option
            v-for="item in tableData.isship"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   -->
        <template slot-scope="scope">
           <el-select v-model="value" placeholder="请选择" @blur='az'>
            <el-option
              v-for="item in scope.row.isship"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select> 
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="">
          <el-button type="text" @click="SGdetail = true">详情</el-button>
          <el-button type="text" @click="SGedit = true" size="small">编辑</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
  <!-- 发货详情 -->
  <div>
    <el-dialog title="订单详情" :visible.sync="SGdetail"
    width="90%">
      <el-table :data="tableData" border>
        <el-table-column property="orderNumber" label="订单编号" width="150"></el-table-column>
        <el-table-column property="productName" label="商品名称" width="150"></el-table-column>
        <el-table-column property="productNumber" label="商品数量" width="150"></el-table-column>
        <el-table-column property="productType" label="商品类型" width="150"></el-table-column>
        <el-table-column property="productPrice" label="商品价格" width="150"></el-table-column>
        <el-table-column property="freight" label="运费" width="150"></el-table-column>
        <el-table-column property="orderTime" label="下单时间" width="150"></el-table-column>
        <el-table-column property="userName" label="买家名称" width="200"></el-table-column>
        <el-table-column property="userNumber" label="电话号码" width="200"></el-table-column>
        <el-table-column property="shipAddress" label="发货地址" width="200"></el-table-column>
        <el-table-column property="shouhuoAddress" label="收获地址" width="150"></el-table-column>
        <el-table-column property="trackingNumber" label="物流单号" width="150"></el-table-column>      
        <el-table-column property="isship" label="发货状态" width="150"></el-table-column>
        <el-table-column property="fahuoTime" label="发货时间" width="150"></el-table-column>
      </el-table> 
    </el-dialog>
  </div>
  <!-- 发货编辑 -->
  <div>
    <el-dialog title="订单编辑" :visible.sync="SGedit"
    width="50%">
      <el-table :data="tableData" border>
        <el-table-column property="orderNumber" label="订单编号" width="150"></el-table-column>
        <el-table-column property="productName" label="商品名称" width="150"></el-table-column>
        <el-table-column property="userName" label="买家名称" width="200"></el-table-column>
        <el-table-column property="userNumber" label="电话号码"></el-table-column> 
      </el-table> 
    </el-dialog>
  </div>
  <div class="SG-fenye">
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      az(){
        // console.log(this.);
      }
    },
    
    data() {
      return {
        block:'block',
        none:'none',
        value:'',
        // options: [{
        //   value: '选项1',
        //   label: '已发货'
        // }, {
        //   value: '选项2',
        //   label: '已发货'
        // }, {
        //   value: '选项3',
        //   label: '已发货'
        // }, {
        //   value: '选项4',                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        //   label: '已发货'
        // }, {
        //   value: '选项5',
        //   label: '已发货'
        // }],
        tableData: [{
          orderNumber: '11111',
          productName: 'nike air',
          productNumber: '99',
          productType: '男鞋',
          productPrice: '129',
          userName: '渣渣辉',
          userNumber: '15228533647',
          trackingNumber:'45645156156443165456456',
          freight:6,
          shipAddress: '上海市普陀区金沙江路 1518 弄',
          shouhuoAddress:'成都市武侯区高新青年公寓',
          orderTime:'2020-12-12',
          fahuoTime:'2020-12-22',
          isship: [{
            value: '选项1',
            label: '未发货'
          }, {
            value: '选项2',
            label: '已收货'
          }, {
            value: '选项3',
            label: '正在运输中'
          }]
        }],
        SGdetail: false,
        dialogFormVisible: false,
        SGedit:false,
      }
    }
  }
</script>

<style lang="less" scoped>
  .SG-fenye{
    margin-top: 30px;
  }
  .SG-data{
    margin-top: 30px;
  }
</style>