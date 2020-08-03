<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
  	 this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient3 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient4 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.gradient3.addColorStop(0, "rgba(255, 204, 0, 0.9)");
    this.gradient3.addColorStop(0.5, "rgba(255, 204, 0, 0.5)");
    this.gradient3.addColorStop(1, "rgba(255, 204, 0, 0.2)");

    this.gradient4.addColorStop(0, "rgba(0,51,0,0.9)");
    this.gradient4.addColorStop(0.5, "rgba(0,51,0,0.5)");
    this.gradient4.addColorStop(1, "rgba(0,51,0,0.2)");


   this.renderChart(
      {
        labels: ["Motor bike buy", "Motor bike sell", "Car buy", "Car sell"],
        datasets: [
          {
            backgroundColor: [this.gradient, this.gradient2, this.gradient3, this.gradient4],
            data: this.data
          }
        ]
      },
      this.option
    );

  }
}
</script>
