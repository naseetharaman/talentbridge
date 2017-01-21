angular.module('talent-bridge')
.factory('ModalService', [
    '$uibModal', function ($uibModal, $log) {
        var self = this;
        var modalInstance = null;
        var ModalInstanceCtrl = function($scope, $uibModalInstance, data) {                
            $scope.data = data;
            $scope.close = function() {
                $uibModalInstance.close($scope.data);
            };
        };
        this.open = function (mode, title, message) {
            var data = {
                mode: mode,
                boldTextTitle: title,
                textAlert: message
            }
            modalInstance = $uibModal.open({
                templateUrl: 'modules/common/message.html',
                controller: ModalInstanceCtrl,
                backdrop: false,
                keyboard: true,
                backdropClick: false,
                size: 'lg',
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            });
        };

        
        return this;
    }
]);
