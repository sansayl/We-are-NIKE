r<template>
  <!-- 商品管理页 -->
  <div class="page1">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title"> </template>
        <!-- 添加 -->
        <el-radio-group v-model="direction" class="add">
          <el-radio label="ltr">从左往右开</el-radio>
          <el-radio label="rtl">从右往左开</el-radio>
          <el-radio label="ttb">从上往下开</el-radio>
          <el-radio label="btt">从下往上开</el-radio>
        </el-radio-group>

        <el-button
          @click="drawer = true"
          type="success"
          style="margin-left: 16px"
        >
          点我新增
        </el-button>

        <el-drawer :visible.sync="drawer" :direction="direction" :size="size">
          <el-form ref="form" :model="goodsAddData" label-width="80px">
            <p>基本信息</p>
            <el-row>
              <!-- <div> -->
              <el-col span="8">
                <el-form-item label="一级分类">
                  <el-select
                    @change="oneId"
                    v-model="oneType1"
                    placeholder="请选择"
                    label-width="120px"
                  >
                    <el-option
                      v-for="item in oneType"
                      :key="item.typeId"
                      :label="item.typeName"
                      :value="item.typeId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="二级分类">
                  <el-select
                    @change="twoId"
                    v-model="twoType1"
                    placeholder="请选择"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in twoType"
                      :key="item.typeId"
                      :label="item.name"
                      :value="item.typeId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="8">
                <el-form-item label="商品名称">
                  <el-input
                    placeholder="请输入商品名称"
                    v-model="goodsAddData.name"
                    clearable
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="商品价格">
                  <el-input
                    placeholder="请输入商品价格"
                    v-model="goodsAddData.price"
                    clearable
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="商品库存">
                  <el-input
                    placeholder="请输入商品商品库存"
                    v-model="goodsAddData.num"
                    clearable
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="商品运费">
                  <el-input
                    placeholder="请输入商品运费"
                    v-model="goodsAddData.freight"
                    clearable
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="8">
                <el-form-item label="商品描述">
                  <el-input
                    placeholder="请输入商品描述"
                    v-model="goodsAddData.description"
                    clearable
                    style="width: 300px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="是否上架">
                  <template>
                    <el-radio-group v-model="radio" @change="shangjia">
                      <el-radio v-model="goodsAddData.state" :label="1"
                        >立即上架</el-radio
                      >
                      <el-radio v-model="goodsAddData.state" :label="2"
                        >暂不上架</el-radio
                      >
                    </el-radio-group>
                  </template>
                </el-form-item>
              </el-col>
              <el-col span="8"> </el-col>
            </el-row>
            <el-row>
              <el-col span="16">
                <el-form-item label="商品商品图片">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-button plain>取消</el-button>
              <el-button plain>重置</el-button>
              <el-button type="primary" @click="add">保存</el-button>
            </el-row>
            <!-- </div> -->
          </el-form>
        </el-drawer>
      </el-collapse-item>
    </el-collapse>

    <div class="guanli">
      <p>商品管理</p>
      <!-- 搜索 -->
      <div class="goodSelect">
        <template>
          <el-form
            :inline="true"
            :model="selectdata"
            ref="selectdata"
            class="demo-form-inline"
          >
            <el-form-item label="" prop="name">
              <el-input
                v-model="selectdata.name"
                placeholder="商品名称"
              ></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-cascader
                :options="typeData"
                clearable
                :props="{
                  checkStrictly: true,
                  expandTrigger: 'hover',
                  value: 'type',
                  label: 'name',
                  children: 'list',
                }"
              ></el-cascader>
            </el-form-item>

            <!-- <el-form-item label="" prop="role">
              <el-select v-model="selectdata.name" placeholder="所属分类">
                <el-option
                  v-for="item in oneType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="" prop="code">
              <el-input
                v-model="selectdata.code"
                placeholder="商品编码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectData()">查询</el-button>
              <el-button @click="resetSelect('selectdata')">重置</el-button>
              <el-button type="primary" class="deleBt">删除</el-button>
            </el-form-item>
            <el-form-item> </el-form-item>
          </el-form>
        </template>
      </div>
      <!-- 列表 -->
      <el-tabs v-model="activeName" type="card" @tab-click="changeTab">
        <el-tab-pane label="已上架" name="1">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @row-click="getDataClick"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="createTime" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <!--<el-table-column prop="price" label="价格"> </el-table-column>-->

            <el-table-column prop="num" label="库存"> </el-table-column>
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="freight" label="运费" width="120px">
            </el-table-column>
            <!--<el-table-column prop="pic" label="图片"> </el-table-column>-->
            <!--<el-table-column prop="data" label="创建日期"> </el-table-column>-->
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state == 0">未上架</span>
                <span v-if="scope.row.state == 1">已上架</span>
                <span v-if="scope.row.state == 2">已下架</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template>
                <el-button size="mini" @click="downGoods">下架</el-button>
                <el-button size="mini" @click="editGoodsVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已下架" name="2">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @row-click="getDataClick"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="code" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>

            <!--<el-table-column prop="num" label="库存"> </el-table-column>-->
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="freight" label="运费" width="120px">
            </el-table-column>
            <!--<el-table-column prop="pic" label="图片"> </el-table-column>-->
            <!--<el-table-column prop="data" label="创建日期"> </el-table-column>-->
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state == 0">未上架</span>
                <span v-if="scope.row.state == 1">已上架</span>
                <span v-if="scope.row.state == 2">已下架</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template>
                <el-button size="mini" @click="upGoods()">上架</el-button>
                <el-button size="mini" @click="editGoodsVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待发布" name="0">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @row-click="getDataClick"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="code" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>

            <!--<el-table-column prop="num" label="库存"> </el-table-column>-->
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="freight" label="运费" width="120px">
            </el-table-column>
            <!--<el-table-column prop="pic" label="图片"> </el-table-column>-->
            <!--<el-table-column prop="data" label="创建日期"> </el-table-column>-->
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state == 0">未上架</span>
                <span v-if="scope.row.state == 1">已上架</span>
                <span v-if="scope.row.state == 2">已下架</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template>
                <el-button size="mini" @click="upGoods()">上架</el-button>
                <el-button size="mini" @click="editGoodsVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 页码 -->
      <div class="rolePage">
        <div class="block">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 编辑 -->
      <el-dialog title="编辑" :visible.sync="editGoodsVisible">
        <el-form :model="thisRowData">
          <el-form-item label="商品编码" label-width="120px">
            <el-input
              v-model="thisRowData.code"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称" label-width="120px">
            <el-input
              v-model="thisRowData.name"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格" label-width="120px">
            <el-input
              v-model="thisRowData.price"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="库存" label-width="120px">
            <el-input
              v-model="thisRowData.num"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="运费" label-width="120px">
            <el-input
              v-model="thisRowData.freight"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="图片" label-width="120px">
             <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="addgoodsImgVisible">
                  <img width="100%" :src="addgoodsImgImageUrl" alt="" />
                </el-dialog>
          </el-form-item> -->
          <el-form-item label="描述" label-width="120px">
            <el-input
              type="textarea"
              v-model="thisRowData.description"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" label-width="120px">
            <el-select v-model="thisRowData.stat" placeholder="请选择">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editGoodsVisible = false">取 消</el-button>
          <el-button type="primary" @click="editGoodsDta()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page1 {
  padding: 20px;
}
.add {
  padding-left: 20px;
}

.guanli {
  margin-top: 20px;
  background: white;
  padding: 20px 30px;
  & > p {
    color: #999;
    background: whitesmoke;
    line-height: 20px;
    padding: 10px;
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
  }
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.goodSelect {
  width: 100%;
  height: 60px;
  border-top: gray;
}
</style>
<script>
export default {
  name: "goods",
  data() {
    return {
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      //二级一级类别联动
      twoTypes: [],
      //二级分类选择框
      twoType1: "",
      //一级类别选择框
      oneType1: "",
      //单选
      radio: 1,

      // 商品新增打开方式
      drawer: false,
      direction: "rtl",
      size: "65%",
      //查询
      selectdata: {
        name: "", //商品名称
        code: "", //商品编码
        type: "", //所属分类
      },
      //
      imageUrl: "",
      //表格
      tableData: [
        {
          createTime: this.createTime, //创建时间
          description: this.description, //描述,
          freight: this.freight, //运费
          name: this.name, //商品名称
          num: this.num, //商品库存
          pic: this.pic, //商品图片
          price: this.price, //商品价格
          state: this.state, //商品状态
          typeId: this.typeId, //商品类型id
          typeName: this.typeName, //类型名称
          code: this.createTime, //商品编号
        },
      ],

      // 商品新增
      goodsAddData: {
        name: "", //商品名称
        type: 0, //商品类别
        typeId: 0, //商品二级分类
        price: "", //商品价格
        num: "", //商品库存
        freight: "", //商品运费
        description: "", //商品描述
        state: 1, //商品状态
        pic: this.dialogImageUrl, //图片
      },

      // 商品编辑
      thisRowData: {
        code: "", //商品编码
        name: "", //商品名称
        type: "", //商品类别
        typeid: "", //商品二级分类
        price: "", //商品价格
        num: "", //商品库存
        freight: "", //商品运费
        description: "", //商品描述
        state: "", //商品状态
        id: "", //当前数据ID
      },

      // 商品新增图片上传窗口
      addgoodsImgImageUrl: "",
      addgoodsImgVisible: false,
      disabled: false,

      activeName: "1",
      //编辑弹框
      editGoodsVisible: false,
      dialogFormVisible: false,

      //折叠面板
      activeNames: ["1"],
      // 页码
      currentPage4: 4,
      tableTotal: 0,
      pagesize: 1,
      thisPage: 1,
      limits: 5,
      tablestate: 1, //TAB卡切换
      //查询的下拉框值
      typeData: [
        {
          id: "1",
          type: "aaa",
          name: "aaa",
          list: [
            {
              type: "设计原则q",
              name: "设计原则",
            },
          ],
        },
        {
          id: "2",
          type: "bbb",
          name: "bbb",
          list: [
            {
              type: "设计原则2",
              name: "设计原则",
            },
          ],
        },
      ],
      //一级分类
      oneType: [],
      //二级分类
      twoType: [],
    };
  },

  // 组件加载请求列表接口
  mounted() {
    this.selectDataAll(); // 获取请求列表
    this.selectType(); //获取所有分类
    this.query(); //查询类别
  },
  methods: {
    //获取一级类别id
    oneId() {
      this.goodsAddData.type = this.oneType1;
      console.log(this.oneType1);
      for (let i = 0; i < this.twoTypes.length; i++) {
        if (this.oneType1 == this.twoTypes[i].typeId) {
          this.twoType = [];
          this.twoType.push(this.twoTypes[i]);
        }
      }
    },
    //获取二级类别id
    twoId() {
      this.goodsAddData.typeId = this.twoType1;
      console.log(this.twoType1);
    },
    //查询类别
    query() {
      this.$axios({
        url: "/goodsType/findGoodsTypeAll",
        method: "get",
        params: "",
      })
        .then((res) => {
          // console.log('yyyy',res)
          let json = {};
          let n = null;
          for (let i = 0; i < res.data.date.length; i++) {
            this.oneType.push({
              typeName: res.data.date[i].name,
              typeId: res.data.date[i].id,
            });
            for (let j = 0; j < res.data.date[i].list.length; j++) {
              this.twoTypes.push({
                name: res.data.date[i].list[j].name,
                typeId: res.data.date[i].list[j].typeId,
                id: res.data.date[i].list[j].id,
              });
            }
          }
          // console.log('uuuu',this.oneType)
        })
        .catch((err) => {});
    },

    //商品新增

    //上架
    shangjia() {
      console.log(this.radio);
      this.goodsAddData.state = this.radio;
    },
    //新增
    add() {
      console.log(this.goodsAddData);
      this.$axios({
        url: "/commodity/addCommodity",
        method: "post",
        data: this.goodsAddData,
      })
        .then((res) => {
          alert("成功");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询列表上所属分类
    selectType() {
      this.$axios({
        url: "/goodsType/findGoodsTypeAll",
        method: "get",
      })
        .then((res) => {
          (this.typeData = res.data.date),
            (this.oneType.value = this.typeData.id),
            (this.oneType.name = this.typeData.name),
            console.log(res);
          console.log(this.typeData, "这是查询所有分类数据");
          console.log(this.oneType, "这是一级分类的数据");
        })
        .catch((err) => {
          alert(err);
        });
    },
    // 查询
    selectData() {
      this.$axios({
        url: "/commodity/findByGoods",
        method: "post",
        data: this.selectdata,
      })
        .then((res) => {
          this.tableData = [];
          this.tableTotal = res.data.date.count; //获取总条数
          for (let i = 0; i < res.data.date.length; i++) {
            this.tableData.push(res.data.date[i]);
          }
          // console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    },
    // 重置查询
    resetSelect(formName) {
      this.$refs[formName].resetFields();
    },

    // tab卡切换事件
    changeTab(val) {
      this.tablestate = val.name;
      console.log(this.tablestate);
      this.selectDataAll();
    },
    // 数据列表
    selectDataAll() {
      this.$axios({
        url: "/commodity/findGoodsByState",
        method: "get",
        params: {
          page: this.thisPage,
          limit: Number(this.limits),
          state: this.tablestate,
        },
      })
        .then((res) => {
          this.tableData = res.data.date.date; //获取表格数据
          // console.log(this.tableData,'ggggg');
          this.tableTotal = res.data.date.count; //获取总条数
          console.log(this.tableTotal, "总条数");
          // console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 点击获取一行数据
    getDataClick(val) {
      this.thisRowData = val;
      console.log(this.thisRowData);
    },
    //编辑
    editGoodsDta() {
      this.$axios({
        url: "/commodity/updateCommodity",
        method: "post",
        data: this.thisRowData,
      })
        .then((res) => {
          alert("编辑成功"), (this.editGoodsVisible = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下架
    downGoods() {
      this.$axios({
        url: "/commodity/updateStatus",
        method: "get",
        params: {
          id: this.thisRowData.id,
          state: 2,
        },
      })
        .then((res) => {
          console.log("编辑成功");
          alert("下架成功");
          this.selectDataAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上架
    upGoods() {
      this.$axios({
        url: "/commodity/updateStatus",
        method: "get",
        params: {
          id: this.thisRowData.id,
          state: 1,
        },
      })
        .then((res) => {
          console.log("编辑成功");
          alert("上架成功");
          this.selectDataAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.goodsAddData.pic = this.dialogImageUrl;
      console.log(this.dialogImageUrl);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
      this.goodsAddData.pic = file.name;
    },

    //页码
    handleSizeChange(val) {
      this.limits = ` ${val}`;
      this.selectDataAll();
    },
    handleCurrentChange(val) {
      this.thisPage = `${val}`;
      this.selectDataAll();
    },

    delete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "del",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //折叠面板
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>