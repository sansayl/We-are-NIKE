<template>
  <div class="wareHouse">
    <!-- 搜索 -->
    <div class="wareHouseSelect">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="" prop="workHouse">
          <el-input
            v-model="formInline.workHouse"
            placeholder="仓库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="workHouseMang">
          <el-select
            v-model="formInline.workHouseMang"
            placeholder="仓库管理员"
          >
            <el-option label="仓库管理员1" value="shanghai"></el-option>
            <el-option label="仓库管理员2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSelect('formInline')">查询</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >新增</el-button
          >
          <el-button type="primary" @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 中间表格 -->
    <div class="contTable">
      <template>
        
        <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="houseId" label="仓库编号" width="180">
          </el-table-column>
          <el-table-column prop="houseName" label="仓库名称" width="160">
          </el-table-column>
          <el-table-column prop="houseAddress" label="仓库地址" width="160">
          </el-table-column>
          <el-table-column prop="houseMang" label="仓库管理员" width="160">
          </el-table-column>
          <el-table-column prop="houseMangTel" label="电话号码" width="160">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template>
              <el-button @click="dialogVisible = true" type="text" size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="dialogVisible = true"
                >查看</el-button
              >
              <template>
                <el-popconfirm title="确定删除吗？">
                  <el-button slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 页码 -->
    <div class="warePage">
      <div class="block">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="仓库名称" prop="wareName">
          <el-input v-model="ruleForm.wareName"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="wareAddress">
          <el-input v-model="ruleForm.wareAddress"></el-input>
        </el-form-item>

        <el-form-item label="仓库管理员" prop="wareMang">
          <el-input v-model="ruleForm.wareMang"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="wareMangTel">
          <el-input v-model="ruleForm.wareMangTelx"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.wareHouse {
  padding: 20px;
}
</style>
<script>
export default {
  name: "warehouse",
  data() {
    return {
      // 搜索
      formInline: {
        workHouse: "",
        workHouseMang: "",
      },

      // 表格数据
      tableData: [
        {
          houseId: "10009",
          houseName: "成都大邑仓",
          houseAddress: "四川省成都市天府新区",
          houseMang: "周宇",
          houseMangTel: "13427027701",
        },
        {
          houseId: "10002",
          houseName: "成都新都仓",
          houseAddress: "四川省成都市天府新区",
          houseMang: "张枫林",
          houseMangTel: "13427027701",
        },
      ],
      //页码
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 新增
      dialogVisible: false,
      // 新增页面
      ruleForm: {
        wareName: "",
        wareAddress: "",
        wareMang: "",
        wareMangTel: "",
      },
      //新增页-输入
       
      // 输入校验
      rules: {
        wareName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          {
            min: 10,
            max: 40,
            message: "长度在 10 到 40 个字符",
            trigger: "blur",
          },
        ],
        wareAddress: [
          { required: true, message: "请输入仓库地址", trigger: "change" },
        ],
        wareMang: [
          { required: true, message: "请输入管理员名称", trigger: "change" },
        ],
        wareMangTel: [
          { required: true, message: "请输入管理员电话号码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 查询
    //重置
        // 查询按钮
    submitSelect(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
   
    //新增提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 表格的单选多选
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
      }
    
  },
};
</script>

<style lang="less" scoped>
.wareHouseSelect {
  width: 100%;
  height: 60px;
  // background: teal;
  padding-top: 20px;
  border-top: gray;
}
//搜索
.el-form-item {
  margin-bottom: 0 !important;
}
.el-form {
  padding-left: 20px;
}
//中间数据表格
.contTable {
  padding: 20px;
}
//表头
.el-table-column {
  text-align: center;
}
//页码
.warePage {
  padding-left: 20px;
  margin-top: 20px;
}
//新增页面的样式
.el-form-item {
  margin-bottom: 20px !important;
}
// 删除按钮样式
.el-button {
  border: none;
  // background: white;
}
// .el-button:hover{
//   corlor:lightblue
// }
</style>