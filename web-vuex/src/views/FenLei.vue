<template>
  <div class="page1">
      <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item  name="1" >
              <template slot="title">
                  <span style="float:left;font-weight:bold;font-size:14px;color:#2C8DF4;margin-left: 20px">添加</span>
              </template>
              <div class="Fenlei-top">
                  <span>所属分类</span>
                  <el-select v-model="value" placeholder="请选择">
                      <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                  </el-select>
                  <br>
                  <span>分类名称</span>
                  <el-input class="input"
                            placeholder="请输入内容"
                            v-model="msg"
                            clearable style="width: 225px;margin: 0">
                  </el-input>
                  <br>
                  <span>二级分类</span>
                  <el-select v-model="value2" placeholder="请选择">
                      <el-option
                              v-for="item in options2"
                              :key="item.value2"
                              :label="item.label2"
                              :value="item.value2">
                      </el-option>
                  </el-select>
                  <br>
                  <span>分类描述</span>
                  <el-input class="input"
                            placeholder="请输入内容"
                            v-model="msg1"
                            clearable style="width: 600px;">
                  </el-input>

                  <el-row>
                      <el-button type="primary">添加</el-button>
                      <el-button plain>重置</el-button>
                  </el-row>
              </div>
          </el-collapse-item>
          </el-collapse>

      <div class="Fenlei-botton">
              <el-table
                      :data="tableData"
                      border
                      style="width: 100%">
                  <el-table-column
                          type="selection"
                          width="55">
                  </el-table-column>
                  <el-table-column
                          prop="name"
                          label="分类名称"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="suoshu"
                          label="所属分类"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="shijian"
                          label="创建时间">
                  </el-table-column>
                  <el-table-column
                          prop="paixu"
                          label="排序"
                  width="50px">
                  </el-table-column>
                  <el-table-column
                          prop="miaoshu"
                          label="分类描述">
                  </el-table-column>
                  <el-table-column label="操作" width="200px">
                      <template slot-scope="scope">
                          <el-button
                                  size="mini"
                                  @click="dialogFormVisible = true">编辑</el-button>
                          <el-button
                                  size="mini"
                                  type="danger"
                                  @click="delete1">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>

          <el-dialog title="编辑" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                  <el-form-item label="商品描述" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="商品类别" :label-width="formLabelWidth">
                      <el-select v-model="value" placeholder="请选择">
                          <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="商品名称" :label-width="formLabelWidth">
                      <el-input class="input"
                                placeholder="请输入内容"
                                v-model="msg"
                                clearable style="width: 225px;margin: 0">
                      </el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
          </el-dialog>

      </div>

      <div class="block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
          </el-pagination>
      </div>

  </div>
</template>
<style lang="less" scoped>
.page1{
    padding: 20px;
}
    .Fenlei-top{
        background: white;
        &>span{
          line-height: 80px;
            font-size: 14px !important;
        }
        span{
            margin-left: 40px;
            margin-right: 20px;
        }
        .el-button{
            margin-left: 40px;
            margin-top: 30px;
            margin-bottom: 40px;
            font-size: 13px;
            line-height: 10px;
        }
        margin-bottom: 60px;
    }
    .block{
        text-align: right;
        margin-top: 20px;
    }
    .del{
        color: aquamarine;
        background: aquamarine;
    }
    .Fenlei-botton{
        margin-top: 20px;
    }
</style>
<script>
export default{
  name:'fenlei',
    data() {
        return {
            //一级分类
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            //二级分类
            options2: [{
                value2: '选项1',
                label2: '黄金糕'
            }, {
                value2: '选项2',
                label2: '双皮奶'
            }, {
                value2: '选项3',
                label2: '蚵仔煎'
            }, {
                value2: '选项4',
                label2: '龙须面'
            }, {
                value2: '选项5',
                label2: '北京烤鸭'
            }],
            value2: '',
            msg:'', //分类名称输入框内容
            msg1:'', // 分类描述输入框

            //表格
            tableData: [{
                name:'内衣',
                suoshu:'衣服',
                shijian:'2019年1月20日 12:21:53',
                paixu:'2',
                miaoshu:'没什么特别要说的，我就是半打啤酒，这里写一点分类描述的内容',
            }],
            //页码
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            //编辑弹框
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            //折叠
            activeNames: ['1']
        }

    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        open() {
            this.$alert(`<strong></strong>`, 'HTML 片段', {
                dangerouslyUseHTMLString: true
            });
        },
        delete1() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass:'del'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //多选
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //折叠
        handleChange(val) {
            console.log(val);
        }
    },
}
</script>

