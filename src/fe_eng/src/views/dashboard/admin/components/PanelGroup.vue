<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class='card-panel'>
        <el-col :span="24" class="title-header" style="background: linear-gradient(45deg,#4099ff,#73b4ff);">
          <strong>Tổng đài</strong>
        </el-col>
        <el-col :span="24" style="padding: 2px 0px; border-bottom: 3px solid #4099ff; height: 66%">
          <el-col class="left" :span="12">
            <div class="name-card">
              <span>CSKH</span>
            </div>
            <div class="info">
              <span>{{ panelData.hotlineCount.cskh }}</span>
            </div>
          </el-col>
          <el-col class="right" :span="12">
            <div class="name-card">
              <span>Văn phòng</span>
            </div>
            <div class="info">
              <span>{{ panelData.hotlineCount.office }}</span>
            </div>
          </el-col>
        </el-col>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class='card-panel'>
        <el-col :span="24" class="title-header" style="background: linear-gradient(45deg,#2ed8b6,#59e0c5);">
          <strong>Số cuộc gọi ra hôm nay</strong>
        </el-col>
        <el-col :span="24" style="padding: 2px 0px; border-bottom: 3px solid #2ed8b6; height: 66%">
          <el-col class="left" :span="12">
            <div class="name-card">
              <span>Thành công</span>
            </div>
            <div class="info">
              <span>{{ panelData.callToday.success }}</span>
            </div>
          </el-col>
          <el-col class="right" :span="12">
            <div class="name-card">
              <span>Thất bại</span>
            </div>
            <div class="info">
              <span>{{ panelData.callToday.failure }}</span>
            </div>
          </el-col>
        </el-col>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class='card-panel'>
        <el-col :span="24" class="title-header" style="background: linear-gradient(45deg,#FFB64D,#ffcb80)">
          <strong>Thông số</strong>
        </el-col>
        <el-col :span="24" style="padding: 2px 0px; border-bottom: 3px solid #FFB64D; height: 66%">
          <el-col class="left" :span="12">
            <div class="name-card">
              <span>Thiết bị</span>
            </div>
            <div class="info">
              <span>{{ panelData.statistics.device }}</span>
            </div>
          </el-col>
          <el-col class="right" :span="12">
            <div class="name-card">
              <span>Máy lẻ</span>
            </div>
            <div class="info">
              <span>{{ panelData.statistics.ext }}</span>
            </div>
          </el-col>
        </el-col>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  export default {
    props: ['panelData']
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title-header {
    height: 50px;
    text-align: center;
    padding-top: 15px;
  }
  .title-header strong{
    color: #fff;
    font-size: 18px;
  }
  .name-card{
    margin-top: 10px;
    float: left
  }
  .name-card span {
    font-size: 14px;
    font-weight: bold;
    color: #909399;
  }
  .left{
    border-right: 1px solid #ebeef5; height: 100%;
  }
  .info{
    margin-top: 30px;
    text-align: center;
  }
  .info span{
    font-size: 40px;
  }


  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 148px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 13px;
        }
      }
    }
  }
</style>
