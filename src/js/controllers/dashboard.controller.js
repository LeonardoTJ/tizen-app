import dashboardView from '../../views/dashboard.html';

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.innerHTML = dashboardView;
  return containerDiv;
}