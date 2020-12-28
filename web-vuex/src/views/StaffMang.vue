<template>
  <div class="page9">
    <div class="staffSelect">
      <template>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="" prop="user">
            <el-input
              v-model="formInline.user"
              placeholder="员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="role">
            <el-select v-model="formInline.role" placeholder="角色">
              <el-option label="一般店员" value="一般店员"></el-option>
              <el-option label="仓库管理员" value="仓库管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="tel">
            <el-input
              v-model="formInline.tel"
              placeholder="电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')">查询</el-button>
            <el-button
              type="primary"
              class="staffAddBt"
              @click="dialogVisible = true"
              >新增</el-button>
            <el-button  @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="contTable">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码" width="160">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="160">
          </el-table-column>
          <el-table-column prop="role" label="角色" width="160">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template>
              <el-button @click="dialogVisible = true" type="text" size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="dialogVisibles = true"
                >设置角色</el-button
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

    <div class="staffPage">
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
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="设置角色" :visible.sync="dialogVisibles" width="60%">
      <template>
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入角色名称"
          v-model="value"
          :data="data"
        >
        </el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibles = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "staffmang",
  data() {
    // 设置角色页面内数据
    const generateData = (_) => {
      const data = [];
      const cities = ["系统管理员", "一般店员", "仓库管理员"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
        });
      });
      return data;
    };

    return {
      formInline: {
        user:"",
        role:"",
        tel:"",
      },
      // 表格数据
      tableData: [
        {
          name: "王小虎",
          role: "一般店员",
          tel: "15708009921",
          email: "237709955@qq.com",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          role: "一般店员",
          tel: "15708009921",
          email: "237709955@qq.com",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogVisible: false,
      dialogVisibles: false, //设置角色弹窗
      ruleForm: {
        name: "",
        tel: "",
        email: "",
        role: "",
        address: "",
      },
      // 输入校验
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入电话号码", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
        ],
        address: [
          { required: true, message: "请输入家庭地址", trigger: "blur" },
        ],
      },
      //确认是否删除
      visible: false,
      //页码
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      //选择角色弹窗
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
    };
  },
  methods: {
    // 查询
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
    
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查看
    handleClick(row) {
      console.log(row);
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
  },
};
</script>






<style lang="less"  scoped>
.el-tabs__header {
  margin: 0 !important;
}
.staffSelect {
  width: 100%;
  height: 60px;
  //background: teal;
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
//新增按钮样式
.el-button {
  border: none;
}
.staffAddBt {
  background: #67c23a;
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
.staffPage {
  padding-left: 20px;
  margin-top: 20px;
}
.el-pagination {
  padding: 0;
}
</style>